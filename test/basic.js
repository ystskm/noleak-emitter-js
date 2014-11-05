var nodeunit = require('nodeunit');
var jsdom = require("jsdom");

var repo_be = 'https://raw.github.com/ystskm/browser-emitter-js/';
var repo_ne = 'https://raw.github.com/ystskm/noleak-emitter-js/';

var scripts = [];
scripts.push(repo_be + "master/Emitter.js");
scripts.push(repo + "master/NoleakEmitter.js");

function setup(callback) {
  jsdom.env("<html><head></head><body></body></html>", {
    scripts: scripts
  }, function(errors, window) {
    errors && console.error(errors), callback(window);
  });
}

module.exports = nodeunit.testCase({
  'readme': function(t) {
    setup(function(window) {

      var TestEmitter = window.NoleakEmitter;
      t.equal(typeof TestEmitter, 'function');

      var emitter = new TestEmitter();
      var cnt = 0;

      emitter.on('readme-test', function() {
        t.equal(arguments[0], 0);
        t.equal(arguments[1], 1);
        t.equal(arguments[2], 2);
        cnt++;
      });
      emitter.on('error', function() {
        t.equal(arguments[0], 3);
        t.equal(arguments[1], 4);
        t.equal(arguments[2], 5);
        cnt++;
      });
      emitter.on('end', function() {
        t.equal(arguments[0], 3);
        t.equal(arguments[1], 4);
        t.equal(arguments[2], 5);
        cnt++;
      });

      emitter.emit('readme-test', 0, 1, 2);
      emitter.emit('end', 3, 4, 5);

      setTimeout(function() {
        emitter.emit('readme-test');
        emitter.emit('error');
        emitter.emit('end');
        t.equal(cnt, 2);
        t.done();
      }, 4);
    });
  }
});
