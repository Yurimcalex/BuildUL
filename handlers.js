(function(){
  var templListBtn = document.getElementById('templList');
  var rezultListBtn = document.getElementById('rezultList');
  var inpt = document.getElementById('inpt');
  var outpt = document.getElementById('outpt');

  var textarea = document.createElement('textarea');

  var isInptWithoutArea = true;
  var isEmptyArea = true;

  templListBtn.onclick = function() {
    if (isInptWithoutArea) {
      inpt.innerHTML = '';
      inpt.appendChild(textarea);
      textarea.focus();
      isInptWithoutArea = false;
    }

    if(!isEmptyArea) {
      textarea.value = '';
      isEmptyArea = true;
      textarea.focus();
    }
  }

  rezultListBtn.onclick = function() {
    var ul = createUL(textarea.value);
    outpt.innerHTML = '';

    var section1 = document.createElement('section');
    var section2 = document.createElement('section');
    var txt = document.createTextNode(ul);

    section1.innerHTML = ul;
    section2.appendChild(txt);

    outpt.appendChild(section1);
    outpt.appendChild(section2);

    isEmptyArea = false;
  }
}());