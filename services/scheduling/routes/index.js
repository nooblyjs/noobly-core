'use strict';
const express = require('express');

/**
   * Initailise the scheduling api endpoint. The following endpoints are available
   *  - GET https://domain/administrator/scheduling/api/status : returns a "success" 
   * @param {object} servicemanager
   * @returns {object} _routeManager
   */
module.exports = function (serviceManager) {

    /** Initiate the object */
    var _routeManager = {};

    // Initialise the view manager    
    _routeManager.initialise = function () {
        var _interfaceManager = serviceManager.core.services.interface ? serviceManager.core.services.interface : null;

        if (_interfaceManager != null) {

            _interfaceManager.app().use(express.json());

            // The server ping
            _interfaceManager.app().route('/administrator/scheduling/api/status').get(function (req, res) {
                res.status(200).send('success');
            });
        }
    }()

    return _routeManager;
}