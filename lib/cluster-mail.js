
/*!
 * cluster-mail
 * Copyright(c) 2011 LearnBoost <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Email = require('email').Email
  , jade = require('jade')
  , fs = require('fs');

/**
 * Expose the plugin.
 */

exports = module.exports = mail;

/**
 * Library version.
 */

exports.version = '0.0.2';

/**
 * Initialize mail plugin with the given `email(s)`,
 * with the given `options`.
 *
 * Options:
 *
 *    - `from` sender email
 *    - `timeout` sendmail timeout in milliseconds
 *    - `subject` defaulting to " cluster({worker}) exception: {message}"
 *    - `template` function called with local variables (usually jade / ejs template etc)
 *
 * @param {String|Array} email(s)
 * @param {Object} options
 * @return {Function}
 * @api public
 */

function mail(emails, options) {
  // options
  options = options || {};
  emails = emails || [];
  if ('string' == typeof emails) emails = [emails];
  if (!emails.length) throw new Error('email(s) required');

  // defaults
  options.to = emails;
  options.from = options.from || 'mail@cluster.com';
  var subject = options.subject || 'cluster({worker}) exception: {message}';
  options.template = options.template || template();

  return function(master){
    master.on('worker exception', function(worker, err){
      // subject
      options.subject = subject
        .replace('{worker}', worker.id)
        .replace('{message}', err.message);

      // body
      options.bodyType = 'html';
      options.body = options.template({ worker: worker, error: err });

      // send 
      var email = new Email(options);
      email.send(function(err){
        if (err) console.error(err.stack || err.message);
      });
    });
  };
};

/**
 * Read / compile default template.
 */

function template() {
  var str = fs.readFileSync(__dirname + '/email.jade', 'utf8');
  return jade.compile(str);
}