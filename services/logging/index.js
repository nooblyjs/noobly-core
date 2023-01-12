'use strict';
const events = require('events');
const express = require('express');
const os = require('os');

/**
 * Module : Logging Manager
 * The logging manager object exposes various logging providers using dependancy injection based on the needs of the application
 * The providers that can be used are as follows
 *  - core : The core controller writes to the console
 * @params parameters object that could have the follows
 *  - core : default: ./controllers/core The reference to the controllers to be used that can be read from the configuration    
 * @events The following events are raised by this modile
 *  - log-debug: A log-debug method has been executed
 *  - log-info: A log-info method has been executed
 *  - log-warn: A log-warn method has been executed
 *  - log-error: A log-error method has been executed
*/
module.exports = function (moduleManager) {

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
     * Log a debug message
     * @param {string} message
     * @param {function : optional}  callback 
     */
    _serviceManager.debug = function (message, callback) {
        _serviceManager.raiseEvent('event', { type: 'log-debug', message: 'logged debug on ' + os.hostname, options: { level: 'debug', host: os.hostname } });
        if (callback != null) {
            if (_serviceManager.minimumLoggingLevel >= 3) {
                moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'debug').debug(os.hostname, message, callback);
            }
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'debug').debug(os.hostname, message, function ({ options }) {
                        resolve({ options });
                    })
                });
        }
    }

    /**
     * Log a info message
     * @param {string} message
     * @param {function : optional}  callback 
     */
    _serviceManager.log = function (message, callback) {
        _serviceManager.raiseEvent('event', { type: 'log-debug', message: 'logged info on ' + os.hostname, options: { level: 'info', host: os.hostname } });
        if (callback != null) {
            if (_serviceManager.minimumLoggingLevel >= 2) {
                moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'log').log(os.hostname, message, callback);
            }
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'log').log(os.hostname, message, function ({ options }) {
                        resolve({ options });
                    })
                });
        }
    }

    /**
    *  Log a warning
     * @param {string} message
     * @param {function : optional}  callback 
    */
    _serviceManager.warn = function (message, callback) {
        _serviceManager.raiseEvent('event', { type: 'log-warn', message: 'logged warning on ' + os.hostname, options: { level: 'warn', host: os.hostname } });
        if (callback != null) {
            if (_serviceManager.minimumLoggingLevel >= 1) {
                moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'warn').warn(os.hostname, message, callback);
            }
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'warn').warn(os.hostname, message, function ({ options }) {
                        resolve({ options });
                    })
                });
        }
    }

    /**
     * Log an error
     * @param {string} message
     * @param {function : optional}  callback 
     */
    _serviceManager.error = function (message, callback) {
        _serviceManager.raiseEvent('event', { type: 'log-error', message: 'logged error on ' + os.hostname, options: { level: 'warn', host: os.hostname } });
        if (callback != null) {
            if (_serviceManager.minimumLoggingLevel >= 0) {
                moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'error').error(os.hostname, message, callback);
            }
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'error').error(os.hostname, message, function ({ options }) {
                        resolve({ options });
                    })
                });
        }
    }

    /**
    * Initialise Method
    */
    _serviceManager.initialise = function () {

        // Use the default middleware
        moduleManager.core.common.middleware.use(_serviceManager, moduleManager.core.configuration.has('core.logging.middleware') ? require(moduleManager.core.configuration.get('core.caching.middleware')) : require('./middleware/core')(moduleManager))

        // Use the default event manager
        moduleManager.core.common.middleware.use(_serviceManager, require('../../common/events/events.js')(moduleManager));

        // Load the model manager
        _serviceManager.modelManager = require('./models')(moduleManager)

        // Load the route manager
        _serviceManager.routeManager = require('./routes')(moduleManager)

        // Load the views manager
        _serviceManager.viewManager = require('./views')(moduleManager)

    }();

    return _serviceManager;
};

