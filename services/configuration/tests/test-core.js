'use strict';
const strictEqual = require('assert/strict');

//Perform the test
(function () {

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core                                          =')
    console.log('========================================================================')


    // Lets add some test parameters
    var moduleManager = {};
    moduleManager.parameters = {};

    // intantiate the cache service
    var configuration = require('..')(moduleManager);
    configuration.events.addListener('config-get', function (data) {
        console.log('EVENT Configuration value read: ' + data)
    });

    // Run the test
    console.log ('Test 01: ' + configuration.get('application.name'));
    moduleManager.parameters['application.name'] = 'New Application Name'
    console.log ('Test 02: ' + configuration.get('application.name'));

    console.log('========================================================================')

})();

