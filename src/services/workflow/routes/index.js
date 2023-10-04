'use strict';
const express = require('express');
const cors = require('cors');

/**
   * Initailise the workflow api endpoint. The following endpoints are available
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

            // The workflow create command function
            _interfaceManager.app().route('/administrator/workflow/api/plan/{plan}').post(function (req, res) {
                serviceManager.createPlan(req.params.plan, req.body.data).then(success=>res.status(200).send(success));
            });


            // The workflow status
            _interfaceManager.app().route('/administrator/workflow/api/status').get(function (req, res) {
                res.status(200).send('success');
            });

        }
    }();

    return _routeManager;
};

