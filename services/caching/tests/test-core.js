'use strict';
var events = require('events');

/**
 * Perform the test against the core caching controller
 * Tests Performed
 *  - Value Added : Add a value to the cache. Note that this is a synchronous event
 *  - Async Has : Test if the key is exists in the cache asynchronously 
 *  - Async Get : Retrieve data from the cache asynchronously
 *  - Async Delete : Delete a key from the cache asynchronously
 *  - Has : Test if the key is exists in the cache synchronously 
 *  - Get : Retrieve data from the cache synchronously
 *  - Delete : Delete a key from the cache synchronously
 */
(function() {
    
    const strictEqual = require('assert/strict'); 

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core caching service  - Async                 =')
    console.log('========================================================================')
    
   // Instantiate the modulemanager
   var moduleManager = {}
   moduleManager.services = {};
   moduleManager.parameters = {};
   moduleManager.events = new events.EventEmitter()

    // intantiate the cache service
    var caching = require('..')(moduleManager); 
    moduleManager.events.addListener('event', function(key){
        console.log('EVENT CACHE SET :  Item cached ' + key)
    });
   
    // Set the Key
    var cacheitemAsync = 'This is test item';
    caching.set('cache-key', cacheitemAsync);

    // Test the Async HAS
    caching.has('cache-key',function(exists){
        console.log("Test:" + exists);
        strictEqual(exists,true);
        console.log("01. Async Key exists: " + exists)

        // Test the Async GET
        caching.get('cache-key', function(data){
            strictEqual(data,cacheitemAsync);
            console.log("02. Async Key data: " + data)

            // Test the Async DEL
            caching.del('cache-key', function(){

                // Test that the data has been deleted
                caching.has('cache-key',function(exists){
                    console.log("03. Async Key data: " + exists)
                });
            })
        })  
    })
  
    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core caching service  - Sync                  =')
    console.log('========================================================================')
  
    // Set the Key
    var cacheitem = 'This is test item 2';
    caching.set('cache-key', cacheitem);

    caching.has('cache-key').then(exists=> console.log("01. Async Key exists: " + exists));
    caching.get('cache-key').then(data=> console.log("02. Async Key data: " + data));
    caching.del('cache-key');
    caching.has('cache-key').then(exists=> console.log("01. Async Key exists: " + exists));

})();

