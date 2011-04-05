
/**
 * Module dependencies.
 */

var http = require('http')
  , cluster = require('cluster')
  , mail = require('./');

var server = http.createServer(function(req, res){
  if (Math.random() > 0.9) throw new Error('fail!');
  res.end('Hello World');
});

cluster(server)
  .use(mail('tjholowayhuk@gmail.com'))
  .listen(3000);