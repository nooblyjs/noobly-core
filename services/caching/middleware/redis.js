'use strict';
const redis = require('redis');

/**
 * A redis cache cached provider
 */
module.exports = function (serviceManager) {


    /** Private Objects */
    var _controller = {};
    var client = {};
    var parameters =[];

    /** Test the parameters */
    parameters['host'] = ((serviceManager.parameters['host'] != null) ? serviceManager.parameters['host'] : '');
    parameters['port'] = ((serviceManager.parameters['port'] != null) ? serviceManager.parameters['port'] : '');
    parameters['password'] = ((serviceManager.parameters['password'] != null) ? serviceManager.parameters['password'] : '');


    /**
        * Initialise the Cache Provider with a host and port
    */
    _controller.initialise = function () {
        (async () => {
            if (parameters['password'] == '') {
                client = redis.createClient({ url: 'redis://' + parameters['host'] + ':' + parameters['port'] });
            } else {
                client = redis.createClient({ url: 'redis://' + parameters['host'] + ':' + parameters['port'], password: parameters['password'] });
            }
            await client.connect();
            return;
        })();
    }();

    /**
     *  Cache Provider has method
     * @param {string} key
    */
    _controller.has = function (key, callback) {
        client.exists(key, callback);
    }

    /**
     * Cache Provider set method
     * @param {string} key
     * @param {mixed} value
     * @param {string} callback method
    */
    _controller.set = function (key, value, callback) {
        client.set(key, value,callback );
    }

    /**
     * Cache Provider get method
     * @param {string} key
     * @param {string} callback method
    */
    _controller.get = function (key, callback) {
        client.get(key, callback);
    }

    /**
     * Cache Provider delete method
     * @param {string} key
    */
    _controller.del = function (key, callback) {
        client.del(key, callback);
    }

    return _controller;
};