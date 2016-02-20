var http = require('http');
var url = require('url');
var start = function (route, handle) {
    http.createServer(function (req, res) {
        var pathname = url.parse(req.url).pathname;
        var data = '';

        req.addListener('data', function (chank) {
            data += chank;
        });
        req.addListener('end', function () {
            route(handle, pathname, res, data);
        });
    }).listen(8008);
};
exports.start = start;
