'use strict';
const express = require('express');
const bodyParser = require('body-parser');

/**
   * Initailise the cache api endpoint. The following endpoints are available
   *  - POST https://domain/backoffice/logging/api/debug : log a debug message
   *  - POST https://domain/backoffice/logging/api/info : log a info message
   *  - POST https://domain/backoffice/logging/api/warn : log a warn message
   *  - POST https://domain/backoffice/logging/api/error : log a error message
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
            _interfaceManager.app().use(bodyParser.text({type:"*/*"}))

            // Register the logging endpoints
            _interfaceManager.app().route('/services/logging/api/:level').post(function (req, res) {
                switch (req.params.level.toUpperCase()) {
                    case 'INFO':
                        serviceManager.core.services.logging.debug(req.body);
                        break;
                    case 'INFO':
                        serviceManager.core.services.logging.log(req.body);
                        break;
                    case 'WARN':
                        serviceManager.core.services.logging.warn(req.body);
                        break;
                    case 'ERROR':
                        serviceManager.core.services.logging.error(req.body);
                        break;
                    default:
                        serviceManager.core.services.logging.log(req.body);
                }
                res.sendStatus(200);
            });

            // Register the status endpoints
            _interfaceManager.app().route('/services/logging/api/status').get(function (req, res) {
                res.status(200);
                res.send('success');
            });

        }
    }();

    return _routeManager;
};

