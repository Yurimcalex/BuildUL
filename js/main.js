var listUL = function (str) {
var items = [];
var nestingItems = [];

function prepareData(str) {
  var elements = str.split('\n');
  elements.forEach(function(v, i, a) {
    var el = v;
    var nesting = el.lastIndexOf(' ') + 1;
    var item = el.slice(nesting);
    nestingItems[i] = nesting;
    items[i] = item;
  });
}

//var data = 'Tolik\n Petia\n  Igor\n  Slava\n Natasha\n  Kira\n   Stepa\nIna\n Katia\n  Sveta';
var data = str;
prepareData(data);

function makeArrsFromItems(items) {
  items.forEach(function(v, i, a) {
    a[i] = [v];
  });
}


makeArrsFromItems(items);

var testArr = [1, 2, 0, 3, 4, 4, 6, 2, 6];

function findMaxNumbPos(arr) {
  var curr, res = 0;
  for (var i = arr.length - 1; i >= 0; i--) {
    curr = arr[i];
    if (curr > res) res = curr;
  }
  
  if (res > 0) return arr.lastIndexOf(res);
  else return 0;
  
}

function deleteItem(items, maxPos) {
  var leftPart = items.slice(0, maxPos);
  var rightPart = items.slice(maxPos + 1);
  
  return leftPart.concat(rightPart);
}

function makeStruct(items, nestingItems, names) {
  var currItm, prevItm, maxPos, currPos, prevPos;
  var itms = items.slice(0);
  var nestItms = nestingItems.slice(0);
  
  var obj;
  
  while (true) { 
    maxPos = findMaxNumbPos(nestItms);
   
    if (maxPos === 0) break;
    
    currPos = nestItms[maxPos];
    prevPos = nestItms[maxPos - 1];
   
    if (currPos - prevPos === 0) {
      
      var arr = [];
      arr.push(itms[maxPos - 1]);
      arr.push(itms[maxPos]);
      itms[maxPos - 1] = arr;
      
    } else {
      
      itms[maxPos - 1].push(itms[maxPos]);
      
    }
   
    nestItms = deleteItem(nestItms, maxPos);
    itms = deleteItem(itms, maxPos);
    
  }
  
  return itms;

}

var r = makeStruct(items, nestingItems);
r;

var startTags = [];
var endTags = '</ul></li>';
var parentArr;


function f(arr) {
  for (var i = 0; i < arr.length; i++) {
    parentArr = arr;
    
    if (typeof arr[i] === 'object') {
      f(arr[i]);
  
    } else {
      //console.log(arr[i],'<<==',parentArr);
      if (parentArr.length > 1) {
        startTags.push('<li>' + arr[i] + '<ul>');
      } else {
        startTags.push('<li>' + arr[i] + '</li>');
      }
      
    }
  }
}

f(r);


function findSlicePoints(arr) {
  var rezult = [];
  var prev = -1, next;
  
  for (var i = 0; i < arr.length; i++) {
    next = arr[i];
    
    if (next < prev) rezult.push(i);
    
    prev = next;
  }
  return rezult;
}

var sp = findSlicePoints(nestingItems);


function makeListUL(s, e, sp, arr) {
  var p = sp.slice(0);
  p.unshift(0);
  p.push(arr.length);
  
  var rezult = '';
  var leftPart = [];
  var endTagsAmount = [];
  
  for (var i = 0; i < p.length - 1; i++) {  
    var p1 = s.slice(p[i], p[i + 1]).join('');
    leftPart.push(p1);
  }
  
  arr.push(0); // for end of ul list
  p.shift(0)
  
  for (var i = 0; i < p.length; i++) {
    endTagsAmount.push(arr[p[i] - 1] - arr[p[i]]);
  }
  
  for (var i = 0; i < endTagsAmount.length; i++) {
    rezult += leftPart[i] + makeEndTag(endTagsAmount[i], e);
  }
  
  return '<ul>' + rezult + '</ul>';
  
  
  function makeEndTag(amount, e) {
    var rez = '';
    while(amount--) {
      rez += e;
    }
    return rez;
  }
  
}

return makeListUL(startTags, endTags, sp, nestingItems);


};

module.exports = listUL;