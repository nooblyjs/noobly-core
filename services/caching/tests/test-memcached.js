'use strict';
const strictEqual = require('assert/strict'); 

//Perform the test
(function() {
    
    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core caching service memcached                =')
    console.log('========================================================================')
    
    // Lets add some test parameters
    var parameters = {'host': '127.0.0.1', 'port':11211, 'provider': './controllers/provider-memcached'};
    console.log(process.cwd());

    // intantiate the cache service
    var caching = require('..')(parameters); 
    caching.events.addListener('cache-set', function(data){
        console.log('CACHE SET :  Item cached ' + data)
    });
    caching.events.addListener('cache-has', function(data){
       console.log('CACHE HAS :  Item exists ' + data)
    });
    caching.events.addListener('cache-has', function(data){
       console.log('CACHE HAS :  Item exists ' + data)
    });
    
    // run test
    var cacheitem = 'This is test item';
    caching.set('cache-key', cacheitem);

    try {
        caching.has('cache-key',function(exists){
            strictEqual(exists,true);
        console.log("Cache has tested");
        })
    } catch (err) {
      console.log(err.message);
    }      

    try {
        caching.get('cache-key', function(data){
            strictEqual(data,cacheitem);
            console.log("Cache get tested");
        })
        
    } catch (err) {
      console.log(err.message);
    }      

    try {
        caching.del('cache-key')
        caching.has('cache-key',function(exists){
            strictEqual(exists,false);
            console.log("Cache del tested");
        });
    } catch (err) {
      console.log(err.message);
    }      

    console.log('========================================================================')

})();

