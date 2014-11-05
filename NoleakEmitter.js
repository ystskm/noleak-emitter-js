/***/
// [noleak-emitter-js] NoleakEmitter.js
(function(has_win, has_mod) {

  if(typeof Emitter == 'undefined')
    throw new Error('NoleakEmitter requires "Emitter" on global-scope');

  var processor = typeof setImmediate == 'undefined' ? function(fn) {
    setTimeout(fn, r)
  }: setImmediate;

  has_mod && (module.exports = NoleakEmitter);
  has_win && (window.NoleakEmitter = NoleakEmitter);

  function NoleakEmitter() {
    var emitter = this;

    Emitter.call(emitter);
    emitter.on('error', careLeak).on('end', careLeak);

    function careLeak() {
      processor(function() {
        if(emitter == null)
          return;

        // Like Node
        if(typeof emitter.removeAllListeners == 'function')
          emitter.removeAllListeners();

        // jQuery Oriented API
        if(typeof emitter.off == 'function')
          emitter.off();

        emitter = null;
      });
    }

  }
  for( var i in NonleakEmitter.prototype)
    MyClass.prototype[i] = Emitter.prototype[i];

})(typeof window != 'undefined', typeof module != 'undefined');