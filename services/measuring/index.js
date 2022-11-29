'use strict';
const events = require('events');

/**
 * Measuring Manager class
 */
module.exports = function (moduleManager) {

    /** Initiate the object */
    var _serviceManager = {};

    // The unit being used
    const unit = {
        Integer: 0,
        Double: 1
    }

    // The type of summary required
    const summary = {
        Sum: 0,
        Average: 1,
        Max: 2,
        Min: 3,
        Meduim: 4
    }

    // Load the configuration controller
    var configuration = moduleManager.core.services.configuration;

    // Load the controllers
    _serviceManager.controller = configuration.has('core.caching.contoller') ? require(configuration.get('core.caching.contoller')) : require('./middleware/core')(moduleManager);

    // Initialise the event emitter
    _serviceManager.events = new events.EventEmitter();

    // Load the model manager
    _serviceManager.modelManager = require('./models')(moduleManager)

    // Load the route manager
    _serviceManager.routeManager = require('./routes')(moduleManager)

    // Load the views manager
    _serviceManager.routeManager = require('./views')(moduleManager)

    /**
     *  Capture a measurement
     * @param {string} namespace
     * @param {string} name
     * @param {string} dimension
     * @param {string} unit
     * @param {string} value
     */
    _serviceManager.capture = function (namespace, name, dimension, unit, value) {
        _serviceManager.events.emit('measuring-capture', namespace + ' ' + name);
        _serviceManager.provider.capture(namespace, name, dimension, unit, value)
    }

    /**
     *  return a summary
     * @param {string} namespace
     * @param {string} name
     * @param {string} dimension
     * @param {string} summary
     * @param {function} callback
     */
    _serviceManager.summarise = function (namespace, name, dimension, summary, callback) {
        _serviceManager.events.emit('measuring-summarise', namespace + ' ' + name);
        _serviceManager.provider.capture(namespace, name, dimension, summary, callback)
    }

    return _serviceManager;
};

