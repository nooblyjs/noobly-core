'use strict';
var events = require('events');

/**
 * Module : Caching Manager
 * The caching manager object exposes various caching controllers using dependancy injection based on the needs of the application
 * The middleware that can be used is as follows :
 *  - core : The Core middleware use in memory objects to expose the caching functionality. Note that this cache is cleared when the application stores
 *  - memcached : The memcached middleware will interact against a memcache server
 *  - redis : The redis middleware will interact with a redis server
 *  - rest : The REST middleware will call the current implementation REST endpoints
 * @params moduleManager : The calling component
 * @events The following events are raised by this module
 *  - cache-has : A cache 'has' call has been called
 *  - cache-set : A cache 'set' call has been called
 *  - cache-get : A cache 'get' call has been called
 *  - cache-del : A cache 'del' call has been called
*/
module.exports = function (moduleManager) {

    // Initiate the object 
    var _serviceManager = {};

    // Initialise the middleware container
    _serviceManager.middleware = [];

    // Load the configuration controller
    var configuration = moduleManager.core.services.configuration;

    // Initiate the event emitter
    _serviceManager.events = (moduleManager.events != null ? moduleManager.events: new events.EventEmitter());

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
     * has async method
     * @param {string} key
     * @parm {function : optional}  callback 
    */
    _serviceManager.has = function (key, callback) {
        _serviceManager.raiseEvent('event', { type: 'cache-has', message: 'caching has: ' +  key,  options : {key} });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieve(_serviceManager, 'raiseEvent').forEach.has(key, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    _serviceManager.controller.has(key, function (has) {
                        resolve(has);
                    })
                });
        }
    }

    /**
     * Set async method
     * @param {string} key
     * @param {mixed} value
     * @parm {function : optional} callback
    */
    _serviceManager.set = function (key, value, callback) {
        _serviceManager.raiseEvent('event', { type: 'cache-set', message: 'caching set: ' +  key,  options : {key} });
        if (callback != null) {
            _serviceManager.controller.set(key, value, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    _serviceManager.controller.set(key, value, function (data) {
                        resolve(data);
                    })
                }
            )
        }
    }

    /**
     * Get async method
     * @param {string} key
     * @parm {function : optional} callback
    */
    _serviceManager.get = function (key, callback) {
        _serviceManager.raiseEvent('event', { type: 'cache-get', message: 'caching get: ' +  key,  options : {key} });

        if (callback != null) {
            _serviceManager.controller.get(key, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    _serviceManager.controller.get(key, function (data) {
                        resolve(data);
                    })
                }
            )
        }
    }

    /**
    * Delete async method
    * @param {string} key
    */
    _serviceManager.del = function (key, callback) {
        _serviceManager.raiseEvent('event', { type: 'cache-delete', message: 'caching del: ' +  key,  options : {key} });
        if (callback != null) {
            _serviceManager.controller.del(key, callback)
        } else {
            new Promise(
                (resolve, reject) => {
                    _serviceManager.controller.del(key, function (data) {
                        resolve(data);
                    })
                }).then();
        }
    }


    /**
    * Initialise Method
    */
    _serviceManager.initialise = function () {

        // Set the controller
        _serviceManager.controller = configuration != null && configuration.has('core.caching.contoller') ? require(configuration.get('core.caching.contoller')) : require('./middleware/core')(moduleManager)

        // Use the default middleware
        moduleManager.core.common.middleware.use(_serviceManager,configuration != null && configuration.has('core.caching.contoller') ? require(configuration.get('core.caching.contoller')) : require('./middleware/core')(moduleManager))

        // Use the default event manager
        moduleManager.core.common.middleware.use(_serviceManager,require('../../common/middleware/events-middleware/events')(moduleManager));

        // Load the model manager
        _serviceManager.modelManager = require('./models')(moduleManager)

        // Load the route manager
        _serviceManager.routeManager = require('./routes')(moduleManager)

        // Load the views manager
        _serviceManager.viewManager = require('./views')(moduleManager)

    }();

    return _serviceManager;
};