window.onload = function () {
    'use strict';
    (function() {
        var lks = document.getElementById('menu').children;
        var area;
        var flag = false;
        lks[0].firstChild.onclick = function () {
            listhtml.innerHTML = '';
            var xhr = new XMLHttpRequest;
            xhr.open('GET', '/getdata', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    list.innerHTML = xhr.responseText;
                    area = document.querySelector('form textarea');
                    area.focus();
                    flag = true;
                }
            };
            xhr.send(null);
        };
        lks[1].onclick = function () {
            if (flag) {
                listhtml.innerHTML = area.value;
                var params = area.value;
                /*var div = document.createElement('div');
                var txt = document.createTextNode(listhtml.innerHTML);
                div.appendChild(txt);
                div.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                div.style.marginLeft = '5px';
                div.style.marginRight = '5px';
                listhtml.appendChild(div);*/
                var xhr = new XMLHttpRequest;
                xhr.open('POST', '/getList', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                    }
                };
                xhr.send(params);
            }
        };
    })();
}