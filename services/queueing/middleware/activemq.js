'use strict';
var Stomp = require('stomp-client');

/**
 * The activemq provider
 */
module.exports = function (parameters) {

    var _controller = {};

    const host = ((parameters['host'] != null) ? parameters['host'] : '');  // The connectionstring
    const port = ((parameters['port'] != null) ? parameters['port'] : '');  // The container
    
    const client = new Stomp(host, port, '' , '');

    /** 
     * enqueue method
     * @param {string} queue
     * @param {string} message    
    **/
    _controller.enqueue = function (queue, message) {
        client.publish(queue, message);
    }

    /** 
     * dequeue method
     * @param {string} queue
     * @param {function} callback    
    **/
    _controller.dequeue = function (queue, callback) {
        client.subscribe(queue, callback(body, headers));
    }

    /**
     * send method
     * @param {string} topic
     * @param {string} message
    */
    _controller.send = function (topic, message) {
        
    }

    /**
    * subscribe method
    * @param {string} topic
    * @param {string} subscriber
    */
    _controller.subscribe = function (topic, subscriber) {
        
    }

    /**
    * receive method
    * @param {string} topic
    * @param {string} subscriber
    * @param {function} callback       
    */
    _controller.receive = function (topic, subscriber, callback) {
       
    }

    return _controller;
};
