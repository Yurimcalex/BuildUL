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

var data = 'Tolik\n Petia\n  Igor\n  Slava\n Natasha\n  Kira\n   Stepa\nIna\n Katia\n  Sveta';
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

var r = makeStruct(items, nestingItems, names);
r;

r[1];
function rec(el) {
  if (!el[1]) return '<li>' + el[0] + '</li>';
 
  return '<li>' + el[0] + '<ul>' + rec(el[1]) + '</ul>' + '</li>';
  
}
rec(r[1]);

var rezult = '';

function f(arr) {
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    if (typeof arr[i] === 'object') {
      f(arr[i]);
    } else {
      rezult += '<div>' + arr[i] + '</div>';
    }
  }
}

f(r);
rezult;

};

module.exports = listUL;