# noleak-emitter
  
[![Version](https://badge.fury.io/js/noleak-emitter.png)](https://npmjs.org/package/noleak-emitter)
[![Build status](https://travis-ci.org/ystskm/noleak-emitter-js.png)](https://travis-ci.org/ystskm/noleak-emitter-js)  
  
Wrapper for Simple Event Emitter ( "util('events').EventEmitter" or "[browser-emitter](https://github.com/ystskm/browser-emitter-js)" ). 
On "error" or "end" event, you can unbind the listeners automatically.

## Install

Install with [npm](http://npmjs.org/):

    npm install noleak-emitter
    
## API - Set functions by args

    // On node.js, require('events').EventEmitter will be inherited.
    var NoleakEmitter = require('noleak-emitter');
    var emitter = new NoleakEmitter();
    emitter.on('hoge', function(){ console.log(arguments) });
    emitter.emit('hoge', 'a', 'b', 'c'); // => 'a', 'b', 'c'
    emitter.emit('end');
    
    setTimeout(function(){
      emitter.emit('hoge', 'd'); // => (no output)
    }, 4);

### also use on browser

```html
<script type="text/javascript" src="Emitter.js"></script>
<script type="text/javascript" src="NoleakEmitter.js"></script>
<script type="text/javascript">

    // On browser, some simple event emitter must be exported
    // on global-scope(window).
    var emitter = new NoleakEmitter();
    emitter.on('hoge', function(){ console.log(arguments) });
    emitter.emit('hoge', 'a', 'b', 'c'); // => ['a', 'b', 'c']
    emitter.emit('end');
    
    setTimeout(function(){
      emitter.emit('hoge', 'd'); // => (no output)
    }, 4);

</script>
```

## if you want to inherit Emitter to another *class*, use prototype chain.

    // for Factory
    var SubClass = function(){
      NoleakEmitter.call(this);
    }
    for(var i in NoleakEmitter.prototype)
      SubClass.prototype[i] = NoleakEmitter.prototype[i];

    // for Singleton (not recommended)
    var SubClass = function(){
      this.__proto__.__proto__ = new NoleakEmitter();
    }
