'use strict';

module.exports = function () {

    var _controller = {};
    var topics = {};

    /**
     * send method
     * @param {string} topic
     * @param {string} message
    */
    _controller.send = function (topic, message) {
        // Determine if there is a topic, if not create it
        if (topics[topic] == null) {
            topics[topic] = new Array();
        } else {
            topics[topic].forEach(subscriber => {
                subscriber.queue.push(message)
            }
            );
        }
    }

    /**
    * subscribe method
    * @param {string} topic
    * @param {string} subscriber
    */
    _controller.subscribe = function (topic, subscriber) {
        // Determine if there is a topic, if not create it
        if (topics[topic] == null) {
            topics[topic] = new Array();
        } else {

            // Look in the topic for the subscriber
            var fnd = false;
            for (var i = 0; i < topics[topic].length; i++) {
                if (topics[topic][i].name == subscriber) {
                    fnd = true;
                }
            }
            // if note then add the subscriber
            if (!fnd) {
                var objSubscriber = { name: subscriber, queue: [] };
                topics[topic].push(objSubscriber);
            }
        }
    }

    /**
    * receive method
    * @param {string} topic
    * @param {string} subscriber
    * @param {function} callback       
    */
    _controller.receive = function (topic, subscriber, callback) {
        _controller.subscribe(topic, subscriber);
        topics[topic].forEach(item => {
            if (item[subscriber] != null) {
                callback(item.shift())
            }
        });
    }

    return _controller;
}