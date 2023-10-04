'use strict';

const middlewareUtility = require('../../common/middleware');

/**
 * Module : Worker Manager
 * The worker manager object exposes publish subscriber worker object
 * The middleware that can be used is as follows :
 *  - core : The core middleware uses bespoke built threading obejct
 * @params {object} moduleManager : The calling module 
 * @returns  {object} _serviceManager : The service object 
 * @events The following events are raised by this module
 *  - worker-create : A worker has been created : 
 *  - worker-retrieve : When a project is created
*/
module.exports = function (moduleManager) {

    // Initiate the object 
    var _serviceManager = {};

    // Initialise the middleware container
    _serviceManager.middleware = [];

    /**
     * Method : RaiseEvent
     * Note that there may be multiple event middleware's to fire
     * @param {string} name
     * @param {object} options
    */
    _serviceManager.raiseEvent = function (name, options) {
        moduleManager.core.common.middleware.retrieve(_serviceManager, 'raiseEvent').forEach(function (item, index) {
            item.raiseEvent(name, options);
        });
    }

    /**
     * Create a worker thread with a payload amd callback
     * @param worker The worker file or object to execute e.g. './workers/processlargedata.js'
     * @param payload The json payload to pass to the worker e.g. {location : './data/'}
     * @param callback The callback method e.g. function (workerid, worker) {}
     * @param messageCallback The method being called e.g. function (result, payload) {}
     * @param errorCallback The method being called e.g. function (error, payload) {}
     * @param exitCallback The method being called e.g. function (exitCode, payload) {}
     */
    _serviceManager.createWorker = function (worker, payload, callback, messageCallback, errorCallback, exitCallback) {
        _serviceManager.raiseEvent('event', { type: 'worker-create', message: 'worker: ' + worker + ' created ',options: {worker, payload}});
        moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createWorker').createWorker(worker, payload, callback, messageCallback, errorCallback, exitCallback);
    }

     /**
     * Create a worker thread with a payload amd callback
     * @param workerid The worker file or object to execute e.g. './workers/processlargedata.js'
     */
    _serviceManager.retrieveWorker = function (workerid) {
        _serviceManager.raiseEvent('event', { type: 'worker-retrieve', message: 'worker: ' + worker + ' created ', options: {worker, payload}});
        moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createWorker').createWorker(worker, payload, messageCallback, errorCallback, exitCallback)
    }

    /**
    * Initialise the module
    */
    _serviceManager.initialise = function () {

        // Use the default middleware
        moduleManager.core.common.middleware.use(_serviceManager, moduleManager.core.configuration.has('core.worker.contoller') ? require(moduleManager.core.configuration.get('core.worker.contoller')) : require('./middleware/core')(moduleManager))

        // Use the default event manager
        moduleManager.core.common.middleware.use(_serviceManager, require('../../common/events/events')(moduleManager));

        // Load the model manager
        _serviceManager.modelManager = require('./models')(moduleManager)

        // Load the route manager
        _serviceManager.routeManager = require('./routes')(moduleManager)

        // Load the views manager
        _serviceManager.routeManager = require('./views')(moduleManager)

    }();


    return _serviceManager;
};

