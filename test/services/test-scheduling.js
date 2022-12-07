'use strict';
const strictEqual = require('assert/strict'); 

//Perform the test
(function() {
    
    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core scheduler service                         =')
    console.log('========================================================================')
    
    // intantiate the service
    var service = require('..')(); 
    service.events.addListener('scheduling-schedule', function(data){
        console.log('EVENT RAISED :  Scheduler scheduled ' + data)
    });
    
    // run test
    service.schedule('default test','1 * * * *', function(){ 
            console.log('running')
        }
    );

    console.log('========================================================================')

})();

