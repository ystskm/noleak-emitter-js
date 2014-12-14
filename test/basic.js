var nodeunit = require('nodeunit');
var NoleakEmitter = require('../NoleakEmitter');

module.exports = nodeunit.testCase({
  'readme': function(t) {

    var emitter = new NoleakEmitter();
    t.expect(7);

    emitter.on('readme-test', function() {
      t.equal(arguments[0], 0); // No.1
      t.equal(arguments[1], 1); // No.2
      t.equal(arguments[2], 2); // No.3
    });
    emitter.on('error', function() {
      t.equal(arguments[0], 3);
      t.equal(arguments[1], 4);
      t.equal(arguments[2], 5);
    });
    emitter.on('end', function() {
      t.equal(arguments[0], 3); // No.4
      t.equal(arguments[1], 4); // No.5
      t.equal(arguments[2], 5); // No.6
    });

    emitter.emit('readme-test', 0, 1, 2);
    emitter.emit('end', 3, 4, 5);

    setImmediate(function() {
      emitter.emit('readme-test', 0, 1, 2);
      try {
        emitter.emit('error');
      } catch(e) {
        // No.7
        t.ok(e.message); // should throw Unhandled 'error' event
      }
      emitter.emit('end', 3, 4, 5);
      t.done();
    });
  }
});
