'use strict';
const express = require('express');

/**
   * Initailise the cache api endpoint. The following endpoints are available
   *  - HAS https://domain/administrator/caching/api/has/:key : Returns if the key exists
   *  - GET https://domain/administrator/caching/api/get/:key : Returns the cache value in the payload 
   *  - POST https://domain/administrator/caching/api/set/:key : Receives the cache value in the payload () e.g. {data:This is the data } 
   *  - DEL https://domain/administrator/caching/api/delete/:key : Deletes a key 
   *  - GET https://domain/administrator/caching/api/status : returns a "success" 
   * @param {object} servicemanager
   * @returns {object} _routeManager
   */
module.exports = function (serviceManager) {

    /** Initiate the object */
    var _routeManager = {};

    // Initialise the view manager    
    _routeManager.initialise = function () {

        // Extract the interface manager from the parameters and configure
        var _interfaceManager = serviceManager.services.interface != null ? serviceManager.services.interface : null;

        if (_interfaceManager != null) {

            // The cache has command
            _interfaceManager.app().route('/administrator/caching/api/has/:key').get(function (req, res) {
                serviceManager.has(req.params.key)
                serviceManager.has(req.params.key).then(exists => res.status(200).send(exists));
            });

            // The cache get command
            _interfaceManager.app().route('/administrator/caching/api/get/:key').get(function (req, res) {
                console.log(serviceManager.services.caching);
                serviceManager.services.caching.get(req.params.key).then(data => res.status(200).send(data));
            });

            // The cache set command
            _interfaceManager.app().route('/administrator/caching/api/set/:key').post(function (req, res) {
                serviceManager.services.caching.set(req.params.key, req.body.data)
                res.status(200).send('success');
            });

            // The cache delete command
            _interfaceManager.app().route('/administrator/caching/api/delete/:key').delete(function (req, res) {
                serviceManager.services.caching.del(req.params.key)
                res.status(200).send('success');
            });
            
            // The server ping
            _interfaceManager.app().route('/administrator/caching/api/status').get(function (req, res) {
                res.status(200).send('success');
            });
        }
    }();

    return _routeManager;
};

