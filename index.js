document.addEventListener("DOMContentLoaded", () => {
  const inputContainer = document.getElementById('list');
  const outcomeContainer = document.getElementById('listhtml');
  const [createResetListBtn, showListBtn] = document.getElementById('menu').children;

  let isListCreationEnabled = false;

  createResetListBtn.addEventListener('click', () => {
  	outcomeContainer.innerHTML = '';
  	inputContainer.innerHTML = 
  		'<form>' +
        '<textarea name="text"></textarea>'+
      '</form>';
     document.querySelector('form textarea').focus();
     isListCreationEnabled = true;
  });

  showListBtn.addEventListener('click', () => {
  	if (!isListCreationEnabled) return;
  	const inputText = document.querySelector('form textarea').value;
  	new List(inputText).render(outcomeContainer);
  	const result = document.createElement('div');
  	result.textContent = outcomeContainer.innerHTML;
  	result.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
  	result.style.marginLeft = '5px';
  	result.style.marginRight = '5px';
  	outcomeContainer.append(result);
  	isListCreationEnabled = false;
  });

  const menu = document.getElementById('menu');
  menu.addEventListener('click', (e) => {
    const target = e.target;
    if (target.nodeName === 'A' && !target.classList.contains('selected')) {
      const attr = target.dataset.link;
      target.classList.add('selected');
      document.getElementById(attr).classList.add('selected');
      menu.querySelectorAll('a').forEach(link => {
        if (link !== target) {
          link.classList.remove('selected');
          const attr = link.dataset.link;
          document.getElementById(attr).classList.remove('selected');
        }
      });
    }
  });
});