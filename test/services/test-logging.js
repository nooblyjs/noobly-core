/**
 * @fileoverview The following file exposes the caching module tests
 */
'use strict';
const events = require('events');
const assert = require('assert').strict;

//Perform the test
(function() {
    
   console.log('========================================================================')
    console.log('=  TESTING nooblyjs.core logging service                         =')
    console.log('========================================================================')
    
    // Instantiate the modulemanager
    var moduleManager = {};
    moduleManager.core = {};
    moduleManager.core.services = {};
    moduleManager.core.common = {};

    // Add event anager
    moduleManager.events = new events.EventEmitter()
    moduleManager.events.addListener('event', function (data) {
        console.log('Event: type: ' + data.type + ' message: ' + data.message)
    });

    // Load the common utilities
    require('../../common')(moduleManager);

    // intantiate the service
    var service = require('../../services/logging')(moduleManager); 

    // run test
    service.debug('Debug Logged');
    service.log('Info Logged');
    service.warn('Warning Logged');
    service.error('Error Logged');

    console.log('========================================================================')

})();

