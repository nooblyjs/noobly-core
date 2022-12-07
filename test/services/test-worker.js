'use strict';

const events = require('events');

//Perform the test
(function() {
    
    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core                                          =')
    console.log('========================================================================')

    var moduleManager = {}
    moduleManager.core.services = {};
    moduleManager.core.common = {};
    moduleManager.parameters = {'number': 40};
    moduleManager.events = new events.EventEmitter()

    // Load the common module
    require('../../../common')(moduleManager);


    var service = require('..')(moduleManager); 
    moduleManager.events.addListener('event', function (data) {
        console.log('Event: type: ' + data.type + ' message: ' + data.message);
    });

    // Launch a worker
    service.createWorker('./activities/calculation.js' ,  moduleManager.parameters, function(workerid, worker){
        console.log(workerid);
    }, 
    function(worker, options){
        console.log("Message:" +  options.result)
    }, 
    function(worker, options){
        console.log("Error: " + options)
    }, 
    function(worker, options){
        console.log("Exit: " + options.exitCode) 
    });

    console.log('========================================================================')

})();

