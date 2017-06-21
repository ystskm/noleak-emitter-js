var nodeunit = require('nodeunit');
var jsdom, JSDOM = require("jsdom").JSDOM;

var repo_be = 'https://raw.github.com/ystskm/browser-emitter-js/';
var repo_ne = 'https://raw.github.com/ystskm/noleak-emitter-js/';

var html, scripts = [];
scripts.push(repo_be + "master/Emitter.js");
scripts.push(repo_ne + "master/NoleakEmitter.js");

function setup(callback) {
  html = '<html><head>';
  scripts.forEach((s) => {
    html += '<script type="text/javascript" src="' + s + '" async="false"></script>';
  });
  html += '</head><body></body></html>';
  jsdom = new JSDOM(html, { 
    resources: "usable", runScripts: "dangerously"
  });
  jsdom.window.onload = () => callback(jsdom.window);
}

module.exports = nodeunit.testCase({
  'readme': function(t) {
    setup(function(window) {

      console.log(window.Emitter);
      console.log(window.NoleakEmitter);
      
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
        emitter.emit('readme-test', 0, 1, 2);
        try {
          emitter.emit('error');
        } catch(e){
          t.ok(e.message); // should throw Unhandled 'error' event
        }
        emitter.emit('end', 3, 4, 5);
        t.equal(cnt, 2);
        t.done();
      }, 4);
    });
  }
});
