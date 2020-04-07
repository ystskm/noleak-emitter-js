/***/
// [noleak-emitter-js] NoleakEmitter.js
// イベント開放実装もれによりメモリリークを起こすことを回避する。
(function(has_win, has_mod, Emitter) {
  
  var NULL = null, TRUE = true, FALSE = false, UNDEF = undefined;
  if(has_win && window.Emitter)
    Emitter = window.Emitter;
  if(has_mod && typeof global != 'undefined')
    Emitter = Emitter || global.Emitter || require('events').EventEmitter;

  if(typeof Emitter == 'undefined')
    throw new Error('NoleakEmitter requires "Emitter" on global-scope');

  var processor = typeof setImmediate == 'undefined' ? function(fn) {
    setTimeout(fn, 4)
  }: setImmediate;

  has_mod && (module.exports = NoleakEmitter);
  has_win && (window.NoleakEmitter = NoleakEmitter);

  function NoleakEmitter() {
    var emitter = this;

    Emitter.call(emitter);
    emitter.on('error', careLeak).on('end', careLeak);

    function careLeak() {
      processor(function() {
        if(emitter == NULL)
          return;
    	switch(TRUE) {

        // Like Node
    	case typeof emitter.removeAllListeners == 'function':
          emitter.removeAllListeners();
    	  break;

        // jQuery Oriented API
        case typeof emitter.off == 'function':
          emitter.off();
          break;
          
    	}
        emitter = NULL;
      });
    }

  }
  for( var i in Emitter.prototype)
    NoleakEmitter.prototype[i] = Emitter.prototype[i];

})(typeof window != 'undefined', typeof module != 'undefined');
