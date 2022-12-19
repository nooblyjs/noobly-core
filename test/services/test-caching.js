/**
 * @fileoverview The following file exposes the caching module tests
 */
'use strict';
const events = require('events');
const assert = require('assert').strict;

/**
 * Perform the test against the caching service
 * Tests Performed
 *  - Add a value Asynchronously
 *  - Test that the value has been added Asynchronously
 *  - Get the added item Asynchronously
 *  - Delete the item Asynchronously
 *  - Add a value with a Promise
 *  - Test that the value has been added with a Promise
 *  - Get the added item with a Promise
 *  - Delete the item with a Promise
 */
(function () {

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

    // Instantiate the Caching Service and wire up events
    var caching = require('../../services/caching')(moduleManager);


    // Test the setting of a cache value with has
    describe("Cache (Asynchronous) Setting Test", function () {
        it("Should be able to determine if the cache item has been saved by HAS", function () {
            caching.set('cache-key-test-1', 'Some cached text', function () {
                caching.has('cache-key-test-1', function (exists) {
                    assert.notStrictEqual(exists, false);
                });
            });
        });
    });

    // Test the setting of a cache value with get
    describe("Caching (Asynchronous) Value Test", function () {
        var cacheitemAsync = 'This is test item';
        it("Should be able to determine if the cache item has been saved by get ", function () {
            caching.set('cache-key-test2', cacheitemAsync, function () {
                caching.get('cache-key-test2', function (data) {
                    assert.strictEqual(data, cacheitemAsync);
                });
            });
        });
    });

    // Test the deleting of a key with has
    describe("Caching (Asynchronous) Delete Test", function () {
        var cacheitemAsync = 'This is test item';
        it("Should be able to determine if the cache item has been deleted", function () {
            caching.set('cache-key-test3', cacheitemAsync, function () {
                caching.has('cache-key-test3', function (exists) {
                    assert.notStrictEqual(exists, true);
                    caching.del('cache-key-test3', function (exists) {
                        caching.has('cache-key-test3', function (exists) {
                            assert.notStrictEqual(exists, false);
                        });
                    });
                });
            });
        });
    });

    // Test the setting of a cache value with has
    describe("Cache Setting Test", function () {
        it("Should be able to determine if the cache item has been saved by has synchronously", function () {
            caching.set('cache-key-test4', 'This is test item');
            caching.has('cache-key-test4').then(data => function (exists) {
                assert.notStrictEqual(exists, false);
            });
        });
    });

    // Test the setting of a cache value with has
    describe("Caching Value Test", function () {
        var cacheitem = 'This is test item';
        it("Should be able to determine if the cache item has been saved by value synchronously", function () {
            caching.set('cache-key-test-5', cacheitem);
            caching.get('cache-key-test-5').then(data => function (data) {
                assert.notStrictEqual(data, cacheitem);
            });
        });
    });

    // Test the deleting of a key test
    describe("Caching delete Test", function () {
        var cacheitem = 'This is test item';
        it("Should be able to determine if the cache item has been deleted synchronously", function () {
            caching.set('cache-key-test-6', cacheitem);
            caching.get('cache-key-test-6').then(data => function (data) {
                assert.notStrictEqual(data, cacheitem);
                caching.del('cache-key-test-6').then(success => function (success) {
                    caching.has('cache-key-test6').then(data => function (exists) {
                        assert.strictEqual(exists, false);
                    });
                })
            });
        });
    });

})();

