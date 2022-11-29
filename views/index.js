'use strict';
const events = require('events');
const express = require('express');

/**
 * The noobsjs core view manager
 * This view manager is responsible for the administrator views
 * @param {object} moduleManager The parent module
 * @events core-viewmanager-initialise : When the views are initalised
 */
module.exports = function (moduleManager) {

    // Determine if we are running as a module
    var isModule = 'isModule' in moduleManager.parameters ? moduleManager.parameters['isModule'] : null

    /** Initiate the object */
    var _viewManager = {};

    // Initialise the event emitter
    _viewManager.events = new events.EventEmitter();

    /**
     * Middleware to replace the navigation text
     */
    _viewManager.replaceNavigation = function (req, res, next){
        //var body = res.body;
        //console.log(res);
        //body = body.replace('{navigation}', 'navigation');
        //res.body = body;
        next();
    }

    // Initialise the view manager    
    _viewManager.initialise = function () {

        // Extract the inverface manager from the parameters and configure
        var _interfaceManager = moduleManager.core.services.interface ? moduleManager.core.services.interface : null;
        _interfaceManager.app().use(express.json())
        _interfaceManager.app().use(_viewManager.replaceNavigation)
        
        // Register the UI css and js to be used by all backoffice interfaces
        _interfaceManager.registerSite('/dist', (isModule ? './node_modules/noobsjs' : '.') + '/services/views/dist');
        
        // Register the admin views
        _interfaceManager.registerSite('/administrator', (isModule ? './node_modules/noobsjs' : '.') + '/services/views/administrator')

        // Raise the initalised event
        _viewManager.events.emit('core-viewmanager-initialise', 'success');

    }();

    return _viewManager;
};