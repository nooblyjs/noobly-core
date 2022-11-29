'use strict';

/**
 * The queue manager object exposes various queue providers using dependancy injection
 */
module.exports = function () {

    var _controller = {};
    var queues = {};
    var topics = {};

    /** 
     * enqueue method
     * @param {string} queue
     * @param {string} message    
    **/
    _controller.enqueue = function (queue, message) {
        if (queues[queue] == null) {
            queues[queue] = [];
        }
        queues[queue].push(message)
    }

    /** 
     * dequeue method
     * @param {string} queue
     * @param {function} callback    
    **/
    _controller.dequeue = function (queue, callback) {
        if (queues[queue] == null) {
            queues[queue] = [];
        }
        callback(queues[queue].shift())
    }

    /**
    * subscribe method
    * @param {string} topic
    * @param {string} subscriber
    */
    _controller.subscribe = function (topic, subscriber) {
        if (topics[topic] == null) {
            topics[topic] = [];
        } 
        topics[topic].forEach(objSubscriber => {
            if (objSubscriber.name == subscriber) {
                return 
            }
        });
        var objSubscriber = {name: subscriber, queue: []}
        topics[topic].push(objSubscriber);
    }

    /**
     * send method
     * @param {string} topic
     * @param {string} message
    */
     _controller.send = function (topic, message) {
        if (topics[topic] == null) {
            topics[topic] = [];
        } else {
            topics[topic].forEach(subscriber => {
                subscriber.queue.push(message)
            });
        }
    }

    /**
    * receive method
    * @param {string} topic
    * @param {string} subscriber
    * @param {function} callback       
    */
    _controller.receive = function (topic, subscriber, callback) {
        topics[topic].forEach(objSubscriber => {
            if (objSubscriber.name == subscriber) {
                callback(objSubscriber.queue.shift())
            }
        });
    }

    return _controller;
};
