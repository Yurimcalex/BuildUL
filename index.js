var server = require('./server');
var router = require('./router');
var handlers = require('./handlers');
var handle = {};
handle['/getdata'] = handlers.createForm;
handle['/'] = handlers.startPage;
handle['/mainjs'] = handlers.sendJS;
handle['/maincss'] = handlers.sendCSS;
server.start(router.route, handle);