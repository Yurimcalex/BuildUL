var fs = require('fs');
var listMaker = require('./main.js');
var querystring = require('querystring');

var createForm = function (res) {
    var form = '<form>' +
    '<textarea name="text"></textarea>'+
    '</form>';
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write(form);
    res.end();
};
var startPage = function (res) {
    fs.readFile('index.html', function(err, cont) {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write(cont);
        res.end();
    })
};
var sendJS = function(res) {
    fs.readFile('js/ajax.js', function(err, cont) {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write(cont);
        res.end();
    });
};
var sendCSS = function(res) {
    fs.readFile('./css/styles.css', function(err, cont) {
        res.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
        res.write(cont);
        res.end();
    })
};
var makeList = function (res, data) {
    var txt = listMaker(data);
    fs.writeFile('./logs/userInpt.txt', txt + '\r\n', function(err) {
        if (err) throw err;
    });
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(txt);
    res.end();
}
exports.createForm = createForm;
exports.startPage = startPage;
exports.sendJS = sendJS;
exports.sendCSS = sendCSS;
exports.makeList = makeList;