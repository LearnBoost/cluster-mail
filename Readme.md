
# cluster-mail

  Email notification plugin for Cluster

## Installation

    $ npm install cluster-mail

## Usage

 Initialize mail plugin with the given `email(s)`, with the given `options`.

 Options:

  - `from` sender email
  - `timeout` sendmail timeout in milliseconds
  - `subject` defaulting to " cluster({worker}) exception: {message}"
  - `template` function called with local variables (usually jade / ejs template etc)

## Example

    var http = require('http')
      , cluster = require('cluster')
      , mail = require('cluster-mail');

    var server = http.createServer(function(req, res){
      if (Math.random() > 0.9) throw new Error('fail!');
      res.end('Hello World');
    });

    cluster(server)
      .use(mail('your@email.com', { from: 'me@somewhere.com' }))
      .use(mail(['or@a-bunch.com', 'of@emails-here.com']))
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