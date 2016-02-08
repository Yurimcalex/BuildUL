var http = require('http');
var url = require('url');
var start = function (route, handle) {
    http.createServer(function (req, res) {
        var pathname = url.parse(req.url).pathname;
        route(handle, pathname, res);
    }).listen(8008);
};
exports.start = start;
