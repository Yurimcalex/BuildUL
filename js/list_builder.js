class List {
  constructor(userStr) {
    this.str = userStr;
  }

  _getListDepth() {
    this.depth = this.str
      .split('\n')
      .map(line => {
        const depth = line.lastIndexOf(' ') + 1;
        return {
          nesting: depth,
          value: line.slice(depth)
        }
      });
  }

  _createUL() {
    const items = [...this.depth];
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

    this.ul = ul;
  }

  render(container) {
    this._getListDepth();
    this._createUL();
    container.append(this.ul);
  }
}


document.addEventListener("DOMContentLoaded", () => {
    const data = 'Fruits\n Apples\n Berries\n  Cranberry\n  Strawberry\nVegitable\n Potato';
    new List(data).render(document.body);
});