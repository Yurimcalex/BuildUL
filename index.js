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
	//new List(data).render(document.body);  
});