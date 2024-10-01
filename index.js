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
});