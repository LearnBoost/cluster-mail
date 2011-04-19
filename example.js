
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

cluster = cluster(server)
  .use(mail('tjholowayhuk@gmail.com'))
  .listen(3000);

if (cluster.isWorker) {
  setTimeout(function(){
    // we can use cluster.call() from within a worker
    // to notify master of an exception that was not uncaught
    console.log('timed out');
    var err = new Error('timeout!');
    cluster.mailException(err);
  }, 5000);
}