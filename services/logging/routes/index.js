'use strict';
const express = require('express');

/**
   * Initailise the cache api endpoint. The following endpoints are available
   *  - POST https://domain/administrator/logging/api/debug : log a debug message
   *  - POST https://domain/administrator/logging/api/info : log a info message
   *  - POST https://domain/administrator/logging/api/warn : log a warn message
   *  - POST https://domain/administrator/logging/api/error : log a error message
   * @param {object} servicemanager
   * @returns {object} _routeManager
   */
module.exports = function (serviceManager) {

    // Create the route object 
    var _routeManager = {};

    // Initialise the view manager    
    _routeManager.initialise = function () {

        // Extract the interface manager from the parameters and configure
        var _interfaceManager = serviceManager.core.services.interface ? serviceManager.core.services.interface : null;

        if (_interfaceManager != null) {
            _interfaceManager.app().use(express.json())

            // Register the logging endpoints
            _interfaceManager.app().route('/administrator/logging/api/:level').post(function (req, res) {
                switch (req.params.level.toUpperCase()) {
                    case 'INFO':
                        serviceManager.core.services.logging.debug(req.body.data);
                        break;
                    case 'INFO':
                        serviceManager.core.services.logging.log(req.body.data);
                        break;
                    case 'WARN':
                        serviceManager.core.services.logging.warn(req.body.data);
                        break;
                    case 'ERROR':
                        serviceManager.core.services.logging.error(req.body.data);
                        break;
                    default:
                        serviceManager.core.services.logging.log(req.body.data);
                }
                res.sendStatus(200);
            });

            // Register the status endpoints
            _interfaceManager.app().route('/administrator/logging/api/status').get(function (req, res) {
                res.status(200);
                res.send('success');
            });

        }
    }();

    return _routeManager;
};

