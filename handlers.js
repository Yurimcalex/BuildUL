var fs = require('fs');
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
    fs.readFile('ind.html', function(err, cont) {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write(cont);
        res.end();
    })
};
var sendJS = function(res) {
    fs.readFile('main.js', function(err, cont) {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write(cont);
        res.end();
    });
};
var sendCSS = function(res) {
    fs.readFile('main.css', function(err, cont) {
        res.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
        res.write(cont);
        res.end();
    })
};
exports.createForm = createForm;
exports.startPage = startPage;
exports.sendJS = sendJS;
exports.sendCSS = sendCSS;