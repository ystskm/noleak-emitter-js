# noleak-emitter
  
[![Version](https://badge.fury.io/js/noleak-emitter.png)](https://npmjs.org/package/noleak-emitter)
[![Build status](https://travis-ci.org/ystskm/noleak-emitter-js.png)](https://travis-ci.org/ystskm/noleak-emitter-js)  
  
Wrapper for Simple Event Emitter ( [browser-emitter](https://github.com/ystskm/browser-emitter-js) ). 
On "error" or "end" event, you can unbind the listeners automatically.

## Install

Install with [npm](http://npmjs.org/):

    npm install browser-emitter
    
## API - Set functions by args

    var Emitter = require('browser-emitter');
    var emitter = new Emitter();
    emitter.on('hoge', function(){ console.log(arguments) });
    emitter.emit('hoge', 'a', 'b', 'c'); // => 'a', 'b', 'c'

### also use on browser

```html
<script type="text/javascript" src="Emitter.js"></script>
<script type="text/javascript" src="NoleakEmitter.js"></script>
<script type="text/javascript">

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
    var MyClass = function(){
      NonleakEmitter.call(this);
    }
    for(var i in NonleakEmitter.prototype)
      MyClass.prototype[i] = Emitter.prototype[i];

    // for Singleton (not recommended)
    var MyClass = function(){
      this.__proto__.__proto__ = new Emitter();
    }
        