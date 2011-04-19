
/**
 * Module dependencies.
 */

var http = require('http')
  , cluster = require('cluster')
  , mail = require('./');

var server = http.createServer(function(req, res){
  // uncaught exceptions are automatically reported, however
  // for exceptions that we have caught, typically within
  // an error handler, we may report them with cluster.reportException()
  try {
    if (Math.random() > 0.9) throw new Error('fail!');
    res.end('Hello World');
  } catch (err) {
    // we can also optionally send an arbitrary json object
    // for use within our template
    var data = { method: req.method, url: req.url };
    cluster.mailException(err, data);
    console.log('sent %s', err.message);
  }
});

cluster = cluster(server)
  .use(mail('tjholowayhuk@gmail.com'))
  .listen(3000);