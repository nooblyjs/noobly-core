'use strict';
const events = require('events');
const express = require('express');

/**
 * The noobsjs core Workflow view manager
 */
module.exports = function (moduleManager) {

    // Determine if we are running as a module
    var isModule = 'isModule' in moduleManager.parameters ? moduleManager.parameters['isModule'] : null

    /** Initiate the object */
    var _viewManager = {};

    // Initialise the event emitter
    _viewManager.events = new events.EventEmitter();

    // Initialise the view manager    
    _viewManager.initialise = function () {

        // Extract the inverface manager from the parameters and configure
        var _interfaceManager = moduleManager.core.services.interface ? moduleManager.core.services.interface : null;
        
        // if there is an interface manager passed then add it
        if (_interfaceManager != null) {
            _interfaceManager.app().use(express.json())

            // Raise the initalised event
            _viewManager.events.emit('core-worklowmanager-initialised', 'success');
        }

    }();

    return _viewManager;
};