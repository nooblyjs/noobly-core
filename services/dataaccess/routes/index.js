'use strict';
const express = require('express');

/**
   * Initailise the cache api endpoint. The following endpoints are available
   *  - POST https://domain/server/dataaccess/db/:db/collection/:collection : Create a database and collection
   *  - POST https://domain/server/dataaccess/index/:db/collection/:collection/index/:indexname : Create an index for a database and collection
   *  - DEL https://domain/server/dataaccess/index/:db/collection/:collection/index/:indexname : Delete an index for a database and collection
   *  - POST https://domain/server/dataaccess/data/:db/collection/:collection/ : Insert data into a database and collection
   *  - UPDATE https://domain/server/dataaccess/data/:db/collection/:collection/filter/:filter : Update data in a database and collection
   *  - DELETE https://domain/server/dataaccess/data/:db/collection/:collection/filter/:filter : Delete data for a filter
   *  - GET https://domain/server/dataaccess/findone/:db/collection/:collection/filter/:filter : select one record for a filter
   *  - GET https://domain/server/dataaccess/find/:db/collection/:collection/filter/:filter : select records for a filter
   *
   * @param {object} servicemanager
   * @returns {object} _routeManager
   */
module.exports = function (serviceManager) {

    /** Initiate the object */
    var _routeManager = {};

    // Initialise the view manager    
    _routeManager.initialise = function () {

        // Extract the app from the parameters and configure
        var _interfaceManager = serviceManager.services.interface ? serviceManager.services.interface : null;

        if (_interfaceManager != null) {
            _interfaceManager.app().use(express.json())

            // The status call
            _interfaceManager.app().route('/administrator/dataaccess/api/status').get(function (req, res) {
                res.status(200).send('success');
            });
        }

    }();

    return _routeManager;
};

