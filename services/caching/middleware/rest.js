'use strict';

const request = require('request');

/**
 * The Rest Cache Controller
 * This controller uses the noobsjs framework rest services. So its a server calling a server
 * 
 * @param serviceManager The parent class that contains the parameters
 * @returns _middleware 
 */
module.exports = function (serviceManager) {

    // Load the configuration controller
    var _configurationManager = serviceManager.services.configuration; 

    /** Variables section */
    var _middleware = {};
    _middleware.datastore = {};

    /**
     * Has method checks if the data exists in the cache
     * @param {string} key The key to checked e.g. "key1"
     * @param {function} callback The method called once the system has checked if the key exists 
     *  e.g. : function(exists,err){ console.log(exists)} -- output: true 
    */
    _middleware.has = function (key, callback) {
        try {
            callback((_middleware.datastore[key] != null), null);
        } catch (exception) {
            callback(null, exception);
        }
    }

    /**
     * Set method sets the data in the cache
     *
     * @param {string} key The key to checked e.g. "key1"
     * @param {mixed} value The value to be store in the cache e.g. "Hello World"
     * @param {function} callback The method called once the system has stored the data and confirms it has been stored 
     *  e.g. : function(exists,err){ console.log(exists)} -- output: true 
    */
    _middleware.set = function (key, value, callback) {
        try {
            _middleware.datastore[key] = value;
            callback((_middleware.datastore[key] != null), null);
        } catch (exception) {
            callback(null, exception);
        }
    }

    /**
     * Get method
     *
     * @param {string} key
     * @param {string} callback method
    */
    _middleware.get = function (key, callback) {
        try {
            callback(_middleware.datastore[key]), null;
        } catch (exception) {
            callback(null, exception);
        }
    }

    /**
     * Delete method
     *
     * @param {string} key
     * @param {string} callback method
    */
    _middleware.del = function (key, callback) {
        _middleware.datastore[key] = null;
        callback(_middleware.datastore[key] == null);
    }

    return _middleware
}