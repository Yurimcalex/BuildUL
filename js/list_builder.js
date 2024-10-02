class List {
  constructor(userStr) {
    this.str = userStr;
  }


  _calсIndents() {
    this.data = this.str
      .split('\n')
      .map(line => {
        let indent;
        for (let i = 0; i < line.length; i += 1) {
          if (line[i] !== ' ') {
            indent = i;
            break;
          }
        }
        return {
          indent,
          value: line.slice(indent)
        }
      });
  }


  _calcNestingDepth() {
    const levels = {};
    let maxIndent = -1;
    let currLevel = -1;
    
    this.data = this.data.map(({ indent, value }) => {  
      if (indent > maxIndent) {
        currLevel++;
        maxIndent = indent;
        levels[indent] = currLevel;
      } else if (indent < maxIndent) {
        currLevel = levels[indent];
        if (!currLevel) {
          while( (indent = indent - 1) > -1 ) {
            currLevel = levels[indent];
          }
        }
        maxIndent = indent;
      }

      return { indent, value, nesting: currLevel };
    });
  }


  _createUL() {
    const items = [...this.data];
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
    this._calсIndents();
    this._calcNestingDepth();
    this._createUL();
    container.append(this.ul);
  }
}