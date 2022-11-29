'use strict';
const events = require('events');

/**
 * Notifying Manager class
 */
module.exports = function (moduleManager) {

    // Initiate the object 
    var _serviceManager = {};

    // Load the configuration controller
    var configuration = moduleManager.services.configuration;

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
     * add method
     * @param {string} topic
     * @param {string} message
    */
    _serviceManager.send = function (topic, message) {
        _serviceManager.events.emit('topic-send', topic);
        _serviceManager.provider.send(topic, message)
    }

    /**
    * subscribe method
    * @param {string} topic
    * @param {string} subscriber
    */
    _serviceManager.subscribe = function (topic, subscriber) {
        _serviceManager.events.emit('topic-subscribe', topic + " " + subscriber);
        _serviceManager.provider.subscribe(topic, subscriber)
    }

    /**
    * subscribe method
    * @param {string} topic
    * @param {string} subscriber
    */
    _serviceManager.recieve = function (topic, subscriber) {
        _serviceManager.events.emit('topic-receive', topic + " " + subscriber);
        _serviceManager.provider.receive(topic, subscriber)
    }

    return _serviceManager;
};

