'use strict';
const express = require('express');

/**
   * Initailise the cache api endpoint. The following endpoints are available
   *  - HAS https://domain/server/caching/has/:key : Returns if the key exists e.g. https://example.com/server/caching/has/mykey
   *  - GET https://domain/server/caching/get/:key : Returns the cache value in the payload 
   *  - POST https://domain/server/caching/set/:key : Receives the cache value in the payload () e.g. {data:This is the data } 
   *  - DEL https://domain/server/caching/delete/:key : Deletes a key https://example.com/server/caching/has/mykey
   *  - GET https://domain/server/caching/status : returns a "Pong" 
   * @param {object} servicemanager
   * @returns {object} _routeManager
   */
module.exports = function (serviceManager) {

    /** Initiate the object */
    var _routeManager = {};

    // Initialise the view manager    
    _routeManager.initialise = function () {

        // Extract the interface manager from the parameters and configure
        var _interfaceManager = serviceManager.core.services.interface ? serviceManager.core.services.interface : null;

        if (_interfaceManager != null) {

            _interfaceManager.app().use(express.json());

            // The queue enqueue command
            _interfaceManager.app().route('/administrator/queueing/queue/api/:queue').post(function (req, res) {
                _serviceManager.core.services.queueing.enqueue(req.params.queue, req.body.data)
                res.status(200).send('success');
            });
    
            // The queue dequeue command
            _interfaceManager.app().route('/administrator/queueing/api/dequeue/:queue').get(function (req, res) {
                _serviceManager.core.services.queueing.dequeue(req.params.queue).then(data => res.status(200).send(data));
            });
    
            // The topic subscribe command
            _interfaceManager.app().route('/administrator/topics/api/subscribe/:topic/:subscriber').get(function (req, res) {
                _serviceManager.core.services.queueing.subscribe(req.params.topic, req.params.subscriber)
                res.status(200).send('success');
            });
    
            // The topics send command
            _interfaceManager.app().route('/administrator/topics/api/send/:topic').post(function (req, res) {
                _serviceManager.core.services.queueing.send(req.params.topic, req.body.data)
                res.status(200).send('success');
            });
    
            // The topic subscribe command
            _interfaceManager.app().route('/administrator/topics/api/receive/:topic/:subscriber').get(function (req, res) {
                _serviceManager.core.services.queueing.receive(req.params.topic, req.params.subscriber).then(data => res.status(200).send(data));
            });
    
            // The server ping
            _interfaceManager.app().route('/administrator/queueing/api/status').get(function (req, res) {
                res.status(200).send('success');
            });
        }
    }();

    return _routeManager;
};

