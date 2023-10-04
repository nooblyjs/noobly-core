'use strict';
const events = require('events');
const express = require('express');

/**
 * Module : Queue Manager
 * The queue manager object exposes various queueing providers using dependancy injection based on the needs of the application
 * The providers that can be used are as follows
 *  - provider-core : The core provider use in memory objects to expose the queueing functionality. Note that this queue is cleared when the application stores
 *  - provider-activemq : The activemq provider will interact against a activemq server
 *  - provider-aws : The AWS provider will interact with AWS SQS
 *  - provider-azure : The Azure provider will interact with Azure Queue Storage
 * @params parameters object that could have the follows
 *  - queue-provider : default: ./controllers/provider-core The reference to the provider to be used that can be read from the configuration    
 * @events The following events are raised by this modile
 *  - queue-enqueue : A queue 'enqueue' call has been called
 *  - queue-dequeue : A queue 'dequeue' call has been called
 *  - topic-subscribe : A queue 'subscribe' call has been called
 *  - topic-send : A queue 'send' call has been called
 *  - topic-receive : A queue 'recieve' call has been called
 * @interfaces
 *  - GET  https://domain/server/queueing/has/:key : returns if the key exists
 *  - GET  https://domain/server/queueing/get/:key : returns the cache value in the payload
 *  - POST https://domain/server/queueing/update/:key : receives the cache value in the payload e.g. {data:This is the data } 
 *  - DEL  https://domain/server/queueing/delete/:key : deletes the key
 *  - GET  https://domain/server/queueing/ping : returns a "Pong" 
*/
module.exports = function (moduleManager) {


    // Initiate the object 
    var _serviceManager = {};

    // Load the controllers
    _serviceManager.controller = 'controller' in moduleManager.parameters ? require(moduleManager.parameters['controller'])(moduleManager) : require('./middleware/core')(moduleManager);

    // Initialise the event emitter
    _serviceManager.events = new events.EventEmitter();

    // Load the model manager
    _serviceManager.modelManager = require('./models')(moduleManager)

    // Load the route manager
    _serviceManager.routeManager = require('./routes')(moduleManager)

    // Load the views manager
    _serviceManager.routeManager = require('./views')(moduleManager)

    /**
     * enqueue method
     * @param {string} queue
     * @param {string} message
    */
    _serviceManager.enqueue = function (queue, message) {
        _serviceManager.events.emit('queue-enqueue', queue);
        _serviceManager.controller.enqueue(queue, message)
    }

    /** 
     * dequeue method
     * @param {string} queue
     * @param {function} callback    
    **/
    _serviceManager.dequeueAsync = function (queue, callback) {
        _serviceManager.events.emit('queue-dequeue', queue);
        _serviceManager.controller.dequeue(queue, callback)
    }

    /** 
 * dequeue method
 * @param {string} queue
 * @param {function} callback    
**/
    _serviceManager.dequeue = function (queue, callback) {
        _serviceManager.events.emit('queue-dequeue', queue);
        return new Promise(
            (resolve, reject) => {
                _serviceManager.controller.dequeue(queue, function (data) {
                    resolve(data);
                })
            });
    }

    /**
   * subscribe method
   * @param {string} topic
   * @param {string} subscriber
   */
    _serviceManager.subscribe = function (topic, subscriber) {
        _serviceManager.events.emit('topic-subscribe', {'topic' : topic, 'subscriber' : subscriber});
        _serviceManager.controller.subscribe(topic, subscriber)
    }

    /**
     * add method
     * @param {string} topic
     * @param {string} message
    */
    _serviceManager.send = function (topic, message) {
        _serviceManager.events.emit('topic-send', topic);
        _serviceManager.controller.send(topic, message)
    }

    /**
   * receiveAsync method
   * @param {string} topic
   * @param {string} subscriber
   * @param {function} callback   
   */
    _serviceManager.receiveAsync = function (topic, subscriber, callback) {
        _serviceManager.events.emit('topic-receive', {'topic' : topic, 'subscriber' : subscriber});
        _serviceManager.controller.receive(topic, subscriber, callback)
    }

    /**
     * receive method
     * @param {string} topic
     * @param {string} subscriber
    */
    _serviceManager.receive = function (topic, subscriber) {
        _serviceManager.events.emit('topic-receive', {'topic' : topic, 'subscriber' : subscriber});
        return new Promise(
            (resolve, reject) => {
                _serviceManager.controller.receive(topic, subscriber, function (data) {
                    resolve(data);
                })
            });
    }

    return _serviceManager;
};

