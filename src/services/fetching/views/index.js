'use strict';
const events = require('events');
const express = require('express');

/**
 * Module : Fetching Manager
 * The fetching manager object exposes various ways to do API Requests
 * The providers that can be used are as follows
 *  - provider-core : The core provider uses native http to call
 * @params parameters object that could have the follows
 *  - fetching-provider : default: ./controllers/provider-core The reference to the provider to be used that can be read from the configuration    
 * @events The following events are raised by this modile
 *  - fetching-fetch : Do a fetch request
 * @interfaces
 *  - GET  https://domain/server/fetching/caching/ : Get payloads that is being cached
 *  - DELETE  https://domain/server/fetching/{key} : Delete a cached key
*/
module.exports = function (moduleManager) {

    // Initiate the object 
    var _serviceManager = {};

    // Initiate the object 
    var _serviceManager = {};

    // Initialise the middleware container
    _serviceManager.middleware = [];

    /**
     * Method : RaiseEvent
     * Note that there may be multiple event middleware's to fire
     * @param {string} name : The name of the even being fired
     * @param {object} options : An object holding the specific parameters
    */
    _serviceManager.raiseEvent = function (name, options) {
        moduleManager.core.common.middleware.retrieve(_serviceManager, 'raiseEvent').forEach(function (item, index) {
            item.raiseEvent(name, options);
        });
    }

     /**
      * Enable a fetch request
      * @param {string} address 
      * @param {object} options 
      * @param {object} callback 
      * @param {object} errorCallback 
      */
     _controller.fetch = function (address, options, callback, errorCallback) {
        _serviceManager.raiseEvent('event', { type: 'datarequest-create', message: 'Request: ' + address, options: { options } });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'readDirectory').create(address, options, callback, errorCallback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'readDirectory').create(address, options, callback, errorCallback, function (status) {
                        resolve(status);
                    })
                });
        }
    }


    // Use the default middleware
    moduleManager.core.common.middleware.use(_serviceManager, moduleManager.core.configuration.has('core.datafetching.contoller') ? require(moduleManager.core.configuration.get('core.datafetching.contoller')) : require('./middleware/core.js')(moduleManager))

    /**
    * Initialise Method
    */
    _serviceManager.initialise = function () {

        // Use the default event manager
        moduleManager.core.common.middleware.use(_serviceManager, require('../../common/events/events.js')(moduleManager));

        // Load the model manager
        _serviceManager.modelManager = require('./models.js')(moduleManager)

        // Load the route manager
        _serviceManager.routeManager = require('./routes.js')(moduleManager)

        // Load the views manager
        _serviceManager.viewManager = require('./views.js')(moduleManager)

    };

    return _serviceManager;
};
