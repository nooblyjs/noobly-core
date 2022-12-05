'use strict';
const events = require('events');
const assert = require('assert').strict;

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
    
    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core caching service  - Async                 =')
    console.log('========================================================================')
    
   // Instantiate the modulemanager
   var moduleManager = {};
   moduleManager.core = {};
   moduleManager.core.services = {};
   moduleManager.parameters = {};
   moduleManager.core.common = {};
   moduleManager.events = new events.EventEmitter()
   require('../../../common')(moduleManager);

    // intantiate the cache service
    var caching = require('..')(moduleManager); 
    moduleManager.events.addListener('event', function(key){
        console.log('EVENT CACHE SET :  Item cached ' + key)
    });
   
    // Set the Key
    var cacheitemAsync = 'This is test item';
    describe("Caching Test", function() {
        it("should be able to determine if the cache item has been saved", function() {
            caching.set('cache-key', cacheitemAsync);
            caching.has('cache-key',function(exists){
                assert.notStrictEqual(exists, false);
            });
        });
    });

    // Test the Async HAS
    caching.has('cache-key',function(exists){
        console.log("Test:" + exists);
        //strictEqual(exists,true);
        console.log("01. Async Key exists: " + exists)

        // Test the Async GET
        caching.get('cache-key', function(data){
            //strictEqual(data,cacheitemAsync);
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

