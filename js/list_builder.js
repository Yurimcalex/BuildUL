var listUL = function (str) {
    'use strict';
    function DataString(str) {
        this.data = str;
    }
    DataString.prototype.prepareData = function () {
        var elements = this.data.split('\n');
        var opt = null;
        var el = null; 
        var i;
        for (i = 0; i < elements.length; i += 1) {
            el = elements[i];
            opt = {};
            opt.nesting = el.lastIndexOf(' ') + 1;
            opt.value = el.slice(opt.nesting);
            elements[i] = opt;
        }

        //console.log(getListDepth(this.data), '1');

        return elements;
    };

    function Member(opt) {
        this.value = opt.value;
        this.nesting = opt.nesting;
    }
    Member.prototype.makeContLI = function () {
        var li = document.createElement('LI');
        li.innerHTML = this.value;
        return li;
    };

    function ListConstructor(str) {
        this.data = new DataString(str).prepareData();
    }
    ListConstructor.prototype.makeMembers = function () {
        var memb = [];
        var i, el;
        var len = this.data.length;
        for (i = 0; i < len; i += 1) {
            el = this.data[i];
            memb[i] = new Member(el);
        }
        
        //console.log(this.data);
        //console.log(memb, '2');

        this.members = memb;
    };
    ListConstructor.prototype.makeList = function () {
        var lst = document.createElement('UL');
        lst.setAttribute('data-depth', -1);
        var uls = {};
        uls['-1'] = lst;
        this.members.push({});
        var i, elm, nest, ul, li;
        for (i = 0; i < this.members.length - 1; i += 1) {
            elm = this.members[i];
            nest = elm.nesting;
            if (nest < this.members[i + 1].nesting) {
                ul = document.createElement('UL');
                ul.setAttribute('data-depth', nest);
                uls[nest] = ul;
                li = this.members[i].makeContLI();
                li.appendChild(ul);
                uls[nest - 1].appendChild(li);
                //(this.members[i]).li = li;
            } else {
                li = this.members[i].makeContLI();
                uls[nest - 1].appendChild(li);
                //(this.members[i]).li = li;
            }
        }
        //this.members.pop(this.members.length - 1);
        this.lst = lst;
    };
    ListConstructor.prototype.makeStructure = function () {
        var struct = {};
        var i, el;
        for (i = 0; i < this.members.length; i += 1) {
            el = this.members[i];
            struct[el.value] = el;
        }
        this.structure = struct;
    };

    function UserList(str) {
        var ul = new ListConstructor(str);
        ul.makeMembers();
        ul.makeList();
        ul.makeStructure();
        this.list = ul.lst;
        this.structure = ul.structure;
        console.log(this);
    }

    return new UserList(str).list;
};





document.addEventListener("DOMContentLoaded", () => {
    const data = 'Fruits\n Apples\n Berries\n  Cranberry\n  Strawberry\nVegitable\n Potato';
    const list = createList( getListDepth(data) );
    console.log(list);
    document.body.append(list);
});


function getListDepth(str) {
  return str
    .split('\n')
    .map(line => {
      const depth = line.lastIndexOf(' ') + 1;
      return {
        nesting: depth,
        value: line.slice(depth)
      }
    });
}


function createList(data) {
  const items = [...data];
  const ul = document.createElement('UL');
  const lists = {};
  
  ul.setAttribute('data-depth', -1);
  lists[-1] = ul;
  items.push({});

  for (let i = 0; i < items.length - 1; i += 1) {
    const { nesting, value } = items[i];
    const li = document.createElement('LI');
    li.textContent = value;

    if (nesting < items[i + 1].nesting) {
      const subUl = document.createElement('UL');
      subUl.setAttribute('data-depth', nesting);
      lists[nesting] = subUl;
      li.append(subUl);
      lists[nesting - 1].append(li);
    
    } else {
      lists[nesting - 1].append(li);
    }
  }

  return ul;
}