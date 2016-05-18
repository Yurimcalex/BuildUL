var createUL = (function(){
  return function(data) {
    var items = []; 
    var nestingItems = [];

var prepareData = function() {
  var elements = data.split('\n');
  elements.forEach(function(v, i, a) {
    loop: for (var k = 0; k < v.length; k++) {
      if (v[0] !== ' ') {
        nestingItems.push(0);
        break loop;
      } else {
        if (v[k] === ' ') {
          if (v[k + 1] !== ' ') {
            nestingItems.push(k + 1);
            break loop;
          }
        }
      } 
    }
    var item = v.slice(nestingItems[i]);
    items[i] = item;
  });
};

    var makeArrsFromItems = function(items) {
      items.forEach(function(v, i, a) {
          a[i] = [v];
      });
      return items;
    }

    var findMaxNumbPos = function(arr) {
      var curr, res = 0;
      for (var i = arr.length - 1; i >= 0; i--) {
        curr = arr[i];
        if (curr > res) res = curr;
      }
      if (res > 0) return arr.lastIndexOf(res);
      else return 0;
    }

    var deleteItem = function(items, maxPos) {
      var leftPart = items.slice(0, maxPos);
      var rightPart = items.slice(maxPos + 1);
      return leftPart.concat(rightPart);
    }

    var makeStruct = function(items, nestingItems, names) {
      var maxPos,
          currPos,
          prevPos;
      var itms = items.slice(0);
      var nestItms = nestingItems.slice(0);

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

    var startTags = [];
    var endTags = '</ul></li>';
    var parentArr;

    var makeStartTags = function(arr) {
      for (var i = 0; i < arr.length; i++) {
        parentArr = arr;
        if (typeof arr[i] === 'object') {
          makeStartTags(arr[i]);
        } else {
          if (parentArr.length > 1) {
            startTags.push('<li>' + arr[i] + '<ul>');
          } else {
            startTags.push('<li>' + arr[i] + '</li>');
          }
       }
      }
      return startTags;
    }

    var findSlicePoints = function(arr) {
      var rezult = [];
      var prev = -1, next;
      for (var i = 0; i < arr.length; i++) {
        next = arr[i];
        if (next < prev) rezult.push(i);
          prev = next;
      }
      return rezult;
    }

    var makeListUL = function(startTags, endTags, sp, arr) {
      var p = sp.slice(0);
      p.unshift(0);
      p.push(arr.length);

      var rezult = '';
      var leftParts = [];
      var endTagsAmount = [];

      for (var i = 0; i < p.length - 1; i++) {  
        var p1 = startTags.slice(p[i], p[i + 1]).join('');
        leftParts.push(p1);
      }

      arr.push(0);
      p.shift(0)

      for (var i = 0; i < p.length; i++) {
        endTagsAmount.push(arr[p[i] - 1] - arr[p[i]]);
      }

      for (var i = 0; i < endTagsAmount.length; i++) {
        rezult += leftParts[i] + makeEndTag(endTagsAmount[i], endTags);
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

    prepareData(data);
    makeArrsFromItems(items);
    var slicePoints = findSlicePoints(nestingItems);
    var structure = makeStruct(items, nestingItems);
    makeStartTags(structure);

    return makeListUL(startTags, endTags, slicePoints, nestingItems);
  }
}());