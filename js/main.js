var listUL = function (str) {
    'use strict';
    //test data
    //var data = 'Tolik\n Petia\n  Igor\n  Slava\n Natasha\n  Kira\n   Stepa\nIna\n Katia\n  Sveta';
    var items = []; //list items will be there;
    var nestingItems = []; // nesting level of items will be there, one 'cpase' - one level;

    function prepareData(str) {
        var elements = str.split('\n');             // split string into array,
        elements.forEach(function(v, i, a) {        // for each element of this array ...
            var el = v;
            var nesting = el.lastIndexOf(' ') + 1;  // find nesting level,
            var item = el.slice(nesting);           // find value whithout spaces
            nestingItems[i] = nesting;              // put its values on correspond arrays;
            items[i] = item;
        });
    }

    //var data = str; // there is user data(user input)
    //prepareData(data); // prepare data

    function makeArrsFromItems(items) {
        items.forEach(function(v, i, a) {
            a[i] = [v];
        });
        return items;
    }

    //makeArrsFromItems(items); // now we get array of arrays, [[Tolik], [Petia], ....] for example;

    function findMaxNumbPos(arr) { // finds position of max number from the end of array;
        var curr, res = 0;
        for (var i = arr.length - 1; i >= 0; i--) {
            curr = arr[i];
            if (curr > res) res = curr;
        }
        if (res > 0) return arr.lastIndexOf(res); // if in array are only zero numbers returns 0;
        else return 0;
    }

    function deleteItem(items, maxPos) { // delete item from array
        var leftPart = items.slice(0, maxPos);
        var rightPart = items.slice(maxPos + 1);
        return leftPart.concat(rightPart);
    }

    // items: [["Tolik"], ["Petia"], ["Igor"], ["Slava"], ["Natasha"], ["Kira"], ["Stepa"], ["Ina"], ["Katia"], ["Sveta"]];
    // nestingItems: [0, 1, 2, 2, 1, 2, 3, 0, 1, 2];
    // make structure that depends on nesting level of each item, uses for list building;
    function makeStruct(items, nestingItems, names) {
        var maxPos,                                   // position of max number from the end of array,
            currPos,                                  // current maxPos,
            prevPos;                                  // previous maxPos,
        var itms = items.slice(0);                    // copy array items,
        var nestItms = nestingItems.slice(0);         // copy array nestingItems;

        while (true) {                                // do while in nestItms leaves only zero numbers,
            maxPos = findMaxNumbPos(nestItms);        // find position of max level nesting,
            if (maxPos === 0) break;                  // break if in nestItms are only zero numbers,
            currPos = nestItms[maxPos];               // remember current position of max level,
            prevPos = nestItms[maxPos - 1];           // remember previous max nesting level,
            if (currPos - prevPos === 0) {            // if next item has the same nesting level that previous, both 
                var arr = [];                         // items will be members of one array,
                arr.push(itms[maxPos - 1]);
                arr.push(itms[maxPos]);
                itms[maxPos - 1] = arr;               // put this array on previous item location,
            } else {
                itms[maxPos - 1].push(itms[maxPos]);  // in other cases all next items will be nest in previous: put
            }                                         // it items(arrays) on previous items(arrays),
            nestItms = deleteItem(nestItms, maxPos);  // delete elements which was processed
            itms = deleteItem(itms, maxPos);
        }
        return itms;
    }

    // [["Tolik", [["Petia", [["Igor"], ["Slava"]]], ["Natasha", ["Kira", ["Stepa"]]]]], ["Ina", ["Katia", ["Sveta"]]]];
    //var struct = makeStruct(items, nestingItems);

    var startTags = []; // it will be start tags plus values
    var endTags = '</ul></li>';
    var parentArr; // array that contains another arrays

    // recursion function that calls for each element of array which is array;
    function makeStartTags(arr) {
        for (var i = 0; i < arr.length; i++) {
            parentArr = arr;                                     // remember parent array for current element,
            if (typeof arr[i] === 'object') {                    // if its array call this function,
                makeStartTags(arr[i]);
            } else {
                //console.log(arr[i],'<<==',parentArr);
                if (parentArr.length > 1) {                      // if parent array contains another arrays,
                    startTags.push('<li>' + arr[i] + '<ul>');    // then it will be LI that contains UL,
                } else {
                    startTags.push('<li>' + arr[i] + '</li>');    // in another cases it will be LI (one of in group Lis);
                }
            }
        }
        return startTags;
    }

    //makeStartTags(struct);

    // finds points that show where endTags must be add to startTags parts
    // nesting levels: [0, 1, 2, 2, 1, 2, 3, 0, 1, 2]
    // rezult positions: [4, 7] rezult of this function, for example
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

    //var sp = findSlicePoints(nestingItems);

    // startTags: ["<li>Tolik<ul>", "<li>Petia<ul>", "<li>Igor</li>", "<li>Slava</li>", "<li>Natasha<ul>", "<li>Kira<ul>", "<li>Stepa</li>", "<li>Ina<ul>", "<li>Katia<ul>", "<li>Sveta</li>"];
    function makeListUL(startTags, endTags, sp, arr) {       // sp - slice points, arr - nestingItems,
        var p = sp.slice(0);
        p.unshift(0);                                        //  add 0 to the begin, add arr.length to the end
        p.push(arr.length);                                  // for makes slice intervals,

        var rezult = '';
        var leftParts = [];                                  // sliced parts
        var endTagsAmount = [];                              // amount of ends tags
        // makes sequence of startTags elements depending on 'camel' points
        for (var i = 0; i < p.length - 1; i++) {  
            var p1 = startTags.slice(p[i], p[i + 1]).join('');
            leftParts.push(p1);
        }

        arr.push(0); // for end of ul list
        p.shift(0)
        // for each element of sequence startTags finds amount of endTags
        for (var i = 0; i < p.length; i++) {
            endTagsAmount.push(arr[p[i] - 1] - arr[p[i]]);
        }
        // makes rezult user UL, for example in each iteration we get:
        //<li>Tolik<ul><li>Petia<ul><li>Igor</li><li>Slava</li></ul></li>
        //<li>Natasha<ul><li>Kira<ul><li>Stepa</li></ul></li></ul></li></ul></li>
        //<li>Ina<ul><li>Katia<ul><li>Sveta</li></ul></li></ul></li>
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

    //------------------------------------building user UL----------------------------------------
    prepareData(str); // --> makes items and nestingItems
    startTags = makeStartTags( makeStruct( makeArrsFromItems(items), nestingItems ) ); // --> makes start tags

    return makeListUL(startTags, endTags, findSlicePoints(nestingItems), nestingItems);

};

module.exports = listUL;