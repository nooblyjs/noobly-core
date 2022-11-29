'use strict';
const events = require('events');
const express = require('express');
const swaggerUi = require('swagger-ui-express')

/**
 * Services Route Manager
 * The services route manager is responsible for serving the services swagger
 *
 * @param {object} moduleManager The parent module
 * @returns {object} _routeManager This route manager
 * @interaces
 *  - /administrator/api/api-docs : displays the swagger for the noobsjs services
 */
module.exports = function (moduleManager) {

    // Determine if we are running as a module
    var isModule = 'isModule' in moduleManager.parameters ? moduleManager.parameters['isModule'] : null

    /** Initiate the object */
    var _routeManager = {};

    // Initialise the event emitter
    _routeManager.events = new events.EventEmitter();

    // Initialise the view manager    
    _routeManager.initialise = function () {

        // Retrieve the interface manager from the interface service
        var _interfaceManager = moduleManager.services.interface ? moduleManager.services.interface : null;
        _interfaceManager.app().use(express.json())

        // Register the Administrator API Swagger
        _interfaceManager.app().use(
            '/administrator/api/docs',
            swaggerUi.serve,
            swaggerUi.setup(require('./swagger.json'))
        );            
    }();

    return _routeManager;
};