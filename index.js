var server = require('./js/server');
var router = require('./js/router');
var handlers = require('./js/handlers');
var handle = {};
handle['/getdata'] = handlers.createForm;
handle['/'] = handlers.startPage;
handle['/mainjs'] = handlers.sendJS;
handle['/maincss'] = handlers.sendCSS;
server.start(router.route, handle);