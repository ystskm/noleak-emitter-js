var nodeunit = require('nodeunit');
var NoleakEmitter = require('./NoleakEmitter.js');

module.exports = nodeunit.testCase({
  'readme': function(t) {

    var emitter = new NoleakEmitter();
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

    setImmediate(function() {
      emitter.emit('readme-test', 0, 1, 2);
      try {
        emitter.emit('error');
      } catch(e) {
        t.ok(e.message); // should throw Unhandled 'error' event
      }
      emitter.emit('end', 3, 4, 5);
      t.equal(cnt, 2);
      t.done();
    });
  }
});
