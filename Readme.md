
# cluster-mail

  Email notification plugin for Cluster

## Installation

    $ npm install cluster-mail

## Usage

 Initialize mail plugin with the given `email(s)`, with the given `options`.

 Options:

  - `from` sender email
  - `timeout` sendmail timeout in milliseconds
  - `subject` defaulting to "cluster({worker}) exception: {message}"
  - `template` function called with local variables (usually jade / ejs template etc)

## Example

    var http = require('http')
      , cluster = require('cluster')
      , mail = require('cluster-mail');

    var server = http.createServer(function(req, res){
      if (Math.random() > 0.9) throw new Error('fail!');
      res.end('Hello World');
    });

    cluster = cluster(server)
      .use(mail('your@email.com', { from: 'me@somewhere.com' }))
      .use(mail(['or@a-bunch.com', 'of@emails-here.com']))
      .listen(3000);

 By default cluster-mail can only notify uncaughtExceptions, however it is typically a good idea to do so from within your application's error handler as well. Below we invoke `cluster.mailException()`, where `cluster` is the return value of `cluster(server)`. We can pass an object containing data to add to the report, such as the authenticated user's id, email, request data, etc.
 
     app.error(function(err, req, res, next){
       cluster.mailException(err, {
           method: req.method
         , url: req.url
         , headers: req.headers
       });
     });

## Manual Reporting Example

  Often it is useful to report an exception within a worker that was caught, thus never terminating the process, in turn never notifying cluster's master process. An example of this would be within a connect or express error handler, where you simply responded with an error page, however you still want to be notified via mail.

  To do this we invoke the `mailException()` method with the error, as well as an optional object containing additional data to display in the email. This may include request information, user information etc. 

      // somewhere in your application
      var data = { method: req.method, url: req.url };
      cluster.mailException(err, data);

      // start the server
      cluster = cluster(server)
        .use(mail(['dev@learnboost.com', 'errors@learnboost.com']))
        .listen(3000);

## Screenshot

![](http://f.cl.ly/items/0K0F3t1s2o172b0j2407/Screenshot.png)

## License 

(The MIT License)

Copyright (c) 2011 LearnBoost &lt;tj@learnboost.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.