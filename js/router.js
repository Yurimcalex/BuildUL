function route(handle, pathname, res) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname](res);
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not found, ;(");
        res.end();
    }
}
exports.route = route;