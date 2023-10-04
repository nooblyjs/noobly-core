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
module.exports = function (moduleManager) {

    /** Initiate the object */
    var _routeManager = {};

    // Initialise the view manager    
    _routeManager.initialise = function () {

        // Extract the interface manager from the parameters and configure
        var _interfaceManager = moduleManager.core.services.interface ? moduleManager.core.services.interface : null;

        if (_interfaceManager != null) {
            
            // Return the success endpoint
            _interfaceManager.app().route('/administrator/caching/api/status').get(function (req, res) {
                res.status(200).send('success');
            });

        }
    }()

    return _routeManager;
};

