'use strict';
const Memcached = require('memcached');

/**
 * A memcached cache provider
 */
module.exports = function (serviceManager){

    /** Initiate the object */

    var _controller = {};
    const host = ((parameters['host'] != null) ? parameters['host'] : '');
    const port = ((parameters['port'] != null) ? parameters['port'] : ''); 

    var client = {};
    
    /**
     * has method
     *
     * @param {string} key
     * @param {function} callback method
    */
    _controller.has = function(key,callback){
        client.exists(key, callback);
    }
    
    /**
     * Set method
     *
     * @param {string} key
     * @param {mixed} value
     * @param {function} callback method
    */
   _controller.set = function(key, value, callback){
        client.set(key, value);
    }
    
    /**
     * Get method
     *
     * @param {string} key
     * @param {function} callback method
    */
   _controller.get = function(key, callback){
       client.get(key, callback);
    }
    
     /**
     * Delete method
     *
     * @param {string} key
     * @param {function} callback method
     */
   _controller.del = function(key, callback){
       client.del(key, callback);
    }

     /**
     * initialise
     *
     * @param {string} host
     * @param {string} port
    */
   _controller.initialise = function(host,port){
       if (host == ""){
           host = "127.0.0.1";
           port = "11211";
       }
       client = new Memcached(host + ":" + port);
    }()

    return _controller;
};