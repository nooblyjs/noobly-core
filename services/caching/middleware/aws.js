'use strict';
var RedisClustr = require('redis-clustr');
var RedisClient = require('redis');


/**
 * Notifying Manager class
 */
module.exports = function (serviceManager) {

    /** Initiate the object */
    var _controller = {};
    
    /* Assign the parameters */
    _controller.parameters = (serviceManager.parameters != null ? serviceManager.parameters : {});

    /** Connect to the redis cache */
    var redis = new RedisClustr({
        servers: [
            {
                host: _controller.parameters['caching.host'],
                port: _controller.parameters['caching.port']
            }
        ],
        createClient: function (port, host) {
            return RedisClient.createClient(port, host);
        }
    });
    

    /**
    * Has method
    * @param {string} key
    * @param {function} callback method
   */
    _controller.has = function (key, callback) {
        callback((_datastore[key] != null));
    }

    /**
     * Set method
     *
     * @param {string} key
     * @param {mixed} value
     * @param {function} callback method
    */
    _controller.set = function (key, value, ttl) {
        redis.set(key, value, function (err, reply) {
          
        });
    }

    /**
     * Get method
     *
     * @param {string} key
     * @param {function} callback method
    */
    _controller.get = function (key, callback) {
        callback(_datastore[key]);
    }

    /**
     * Delete method
     *
     * @param {string} key
     * @param {function} callback method
    */
    _controller.del = function (key, callback) {
        _datastore[key] = null;
        callback(_datastore[key] == null);
    }

    return _controller;
};


//check the functioning

redis.set("framework", "AngularJS", function (err, reply) {

  console.log("redis.set " , reply);

});

redis.get("framework", function (err, reply) {

  console.log("redis.get ", reply);

});