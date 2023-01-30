'use strict';
const events = require('events');
const express = require('express');

/**
 * The nooblyjs core view manager
 * This view manager is responsible for the administrator views
 * @param {object} moduleManager The parent module
 * @events core-viewmanager-initialise : When the views are initalised
 */
module.exports = function (moduleManager) {

    /** Initiate the object */
    var _viewManager = {};

    // Initialise the event emitter
    _viewManager.events = new events.EventEmitter();

    // Initialise the view manager    
    _viewManager.initialise = function () {

        // Extract the inverface manager from the parameters and configure
        var _interfaceManager = moduleManager.core.services.interface ? moduleManager.core.services.interface : null;
        _interfaceManager.app().use(express.json())
        
        // Register the UI css and js to be used by all backoffice interfaces
        _interfaceManager.registerSite('/lib', (moduleManager.core.common.modules.isModule() ? './node_modules/noobly-core' : '.') + '/views/lib');
        
        // Register the admin views
        _interfaceManager.registerSite('/backoffice', (moduleManager.core.common.modules.isModule() ? './node_modules/noobly-core' : '.') + '/views/backoffice')

        // If we are running as a standalone app then redirect too '/administrator'
        if (!isModule){
            _interfaceManager.registerSite('/',  './views/redirect')   
        }

        // Raise the initalised event
        _viewManager.events.emit('core-viewmanager-initialise', 'success');

    }();

    return _viewManager;
};