'use strict';
var events = require('events');

/**
 * The configuration manager object is used to maintain the configuration system. Any parameters will override the configuration
 * The providers that can be used are as follows
 *  - core : This provider leverages the npm 'config' module
 * @param parameters : The global parameters object
 */
module.exports = function (moduleManager) {

    // Initiate the object 
    var _serviceManager = {};

    // Initialise the event emitter
    _serviceManager.events = new events.EventEmitter();

    // Retrieve the parameters from the parent module
    var _parameters = moduleManager.parameters != null ? moduleManager.parameters : [];

    /** Assign the default provider */
    _serviceManager.controller = require('./core')(moduleManager.parameters);

    /**
     * Has Property Method
     * @param {string} property : The property value to be tested if exists
    */
    _serviceManager.has = function (property) {
        if (property in _parameters){
            _serviceManager.events.emit('config-has', property + ' (parameter)');
            return true;
        }
        _serviceManager.events.emit('config-has', property);
        return _serviceManager.controller.has(property)
    }

    /**
     * Get Property has
     * @param {string} property : The property value to be property
    */
     _serviceManager.get = function (property) {
        if (property in _parameters){
            _serviceManager.events.emit('config-get', property + ' (parameter)');
            return _parameters[property];
        }
        _serviceManager.events.emit('config-get', property);
        return _serviceManager.controller.get(property)
    }

    return _serviceManager;
};