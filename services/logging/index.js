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

    // Load the configuration controller
    var configuration = moduleManager.core.services.configuration;

    // Extract the configuration
    _serviceManager.controller = configuration.has('core.logging.contoller') ? require(configuration.get('core.logging.contoller')) : require('./middleware/core')(moduleManager);
    _serviceManager.minimumLoggingLevel = configuration.has('core.logging.logginglevel') ? configuration.get('core.logging.logginglevel') : 2;

    // Initialise the event emitter 
    _serviceManager.events = new events.EventEmitter();

    // Load the model manager
    _serviceManager.modelManager = require('./models')(moduleManager)

    // Load the route manager
    _serviceManager.routeManager = require('./routes')(moduleManager)

    // Load the views manager
    _serviceManager.routeManager = require('./views')(moduleManager)

    /**
     * Log a debug message
     * @param {string} message
     */
    _serviceManager.debugAsync = function (message) {
        if (_serviceManager.minimumLoggingLevel >= 3) {
            _serviceManager.events.emit('log-info', message);
            _serviceManager.controller.debug(os.hostname, message);
        }
    }

    /**
     * Log a debug message
     * @param {string} message
     */
    _serviceManager.debug = function (message, callback) {
        if (_serviceManager.minimumLoggingLevel >= 3) {
            _serviceManager.events.emit('log-info', message);
            _serviceManager.controller.debug(os.hostname, message);
        }
    }

    /**
     * Log a info message
     * @param {string} message
     */
    _serviceManager.logAsync = function (message) {
        if (_serviceManager.minimumLoggingLevel >= 2) {
            _serviceManager.events.emit('log-info', message);
            _serviceManager.controller.log(os.hostname, message);
        }
    }

    /**
     * Log a info message
     * @param {string} message
     */
    _serviceManager.log = function (message, callback) {
        if (_serviceManager.minimumLoggingLevel >= 2) {
            _serviceManager.events.emit('log-info', message);
            _serviceManager.controller.log(os.hostname, message);
        }
    }

    /**
    * Log a warning
    * @param {string} message
    */
    _serviceManager.warn = function (message) {
        if (_serviceManager.minimumLoggingLevel >= 1) {
            _serviceManager.events.emit('log-warn', message);
            _serviceManager.controller.warn(os.hostname, message);
        }
    }


    /**
    *  Log a warning
    * @param {string} message
    */
    _serviceManager.warn = function (message) {
        if (_serviceManager.minimumLoggingLevel >= 1) {
            _serviceManager.events.emit('log-warn', message);
            _serviceManager.controller.warn(os.hostname, message);
        }
    }


    /**
     * Log an error
     * @param {string} message
     */
    _serviceManager.error = function (message) {
        _serviceManager.events.emit('log-error', message);
        _serviceManager.controller.error(os.hostname, message);
    }

    /**
     * Log an error
     * @param {string} message
     */
    _serviceManager.error = function (message) {
        _serviceManager.events.emit('log-error', message);
        _serviceManager.controller.error(os.hostname, message);
    }

    return _serviceManager;
};

