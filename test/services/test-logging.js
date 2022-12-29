'use strict';
const strictEqual = require('assert/strict'); 

//Perform the test
(function() {
    
    console.log('========================================================================')
    console.log('=  TESTING nooblyjs.core logging service                         =')
    console.log('========================================================================')
    
    // intantiate the service
    var parameters ={};
    var service = require('..')(parameters); 
    service.events.addListener('log-info', function(data){
        console.log('EVENT RAISED :  INFO Logged ' + data)
    });
    service.events.addListener('log-warn', function(data){
        console.log('EVENT RAISED :  WARN Logged ' + data)
    });
    service.events.addListener('log-error', function(data){
        console.log('EVENT RAISED :  ERROR Logged ' + data)
    });
    
    // run test
    service.log('Info Logged');
    service.warn('Warning Logged');
    service.error('Error Logged');

    console.log('========================================================================')

})();

