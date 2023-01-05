/**
 * @fileoverview The following file exposes the location model tests
 */
'use strict';
const events = require('events');
const assert = require('assert').strict;

/**
 * Perform the test against the location model
 * Tests Performed
 *  - Add Country and Retrieve Country
 */
(function () {

    // Instantiate the modulemanager
    var moduleManager = {};
    moduleManager.uri = 'nedb://data'
    moduleManager.core = {};
    moduleManager.core.services = {};
    moduleManager.core.common = {};

    // Load the common utilities
    require('../../common')(moduleManager);

    // Add event anager
    moduleManager.events = new events.EventEmitter()
    moduleManager.events.addListener('event', function (data) {
        console.log('Event: type: ' + data.type + ' message: ' + data.message)
    });

    // Instantiate the country model
    var model = require('../../models/location/country')(moduleManager);


    // Test the setting of a cache value with has
    describe('Country Model Add and retrieve"', function () {
        it("Should be able to add a country", function () {
            model.create('ZA', 'South Africa', function (data) {
                assert.strictEqual(data, !null);
                
            })
        });
        it("Should be able to find the country", function () {
            model.retrieve({ code: 'ZA' }, function (data) {
                console.log(data);
                assert.strictEqual(data.name, 'South Africa');
            });
        })
    });

})();
