/**
 * @fileoverview The following file exposes the noobsjs module
 *  The core module is reponsible for loading the following core components
 *  - caching: The caching module enables caching for the platform
 *  - configuration: The configuration module enable allows configuration for the platform
 *  - dataaccess: The data access module enables database access for the plaform
 *  - files: The files module enables files for the platform
 *  - interace: The interface module enables routes and views for the platform
 *  - logging: The logging module enables logging for the platform
 *  - measuring: The measuring module enables measuring for the platform
 *  - notifying: The notifying module enables notifying for the platform
 *  - queueing: The queueing module enables queueing for the platform
 *  - scheduling: The scheduling module enables scheduling for the platform
 *  - searching: The searching module enables searching for the platform
 *  - security: The security module enables security for the platform
 *  - worker: The worker module enables worker for the platform
 *  - workflow: The workflow module enables workflows for the platform
 */
'use strict';
const events = require('events');

/**
 * Module : The services Module encapsulates all the services of noobsjs
 * @param {object} moduleManager : The calling object 
 * @returns {object} _serviceManager
 */
module.exports = function (moduleManager) {

    // Instantiate the returned object
    var _serviceManager = {};

    // Initialise the event emitter
    _serviceManager.events = (moduleManager.events != null ? moduleManager.events: new events.EventEmitter());

    /**
     * Initialise function
     */
    _serviceManager.initialise = function () {

        // The configuration manager
        moduleManager.services.configuration = ((moduleManager.services.configuration != null) ? moduleManager.services.configuration : require('./configuration')(moduleManager));

        // The interface manager
        moduleManager.services.interface = ((moduleManager.services.interface != null) ? moduleManager.services.interface : require('./interface')(moduleManager));

        // The interface manager
        moduleManager.services.dataaccess = ((moduleManager.services.dataaccess != null) ? moduleManager.services.dataaccess : require('./dataaccess')(moduleManager));

        // The Logging Manager   
        moduleManager.services.logging = ((moduleManager.services.logging != null) ? moduleManager.services.logging : require('./logging')(moduleManager));

        // The Caching Manager
        moduleManager.services.caching = ((moduleManager.services.caching != null) ? moduleManager.services.caching : require('./caching')(moduleManager));

        // The Queueing Manager
        moduleManager.services.queueing = ((moduleManager.services.queueing != null) ? moduleManager.services.queueing : require('./queueing')(moduleManager));

        // The Files Manager
        moduleManager.services.files = ((moduleManager.services.files != null) ? moduleManager.services.files : require('./files')(moduleManager));

        // The Measuring Manager
        moduleManager.services.measuring = ((moduleManager.services.measuring != null) ? moduleManager.services.measuring : require('./measuring')(moduleManager));

        // The Notifying Manager
        moduleManager.services.notifying = ((moduleManager.services.notifying != null) ? moduleManager.services.notifying : require('./notifying')(moduleManager));

        // The Scheduling Manager
        moduleManager.services.scheduling = ((moduleManager.services.scheduling != null) ? moduleManager.services.scheduling : require('./scheduling')(moduleManager));

        // The Searching Manager
        moduleManager.services.searching = ((moduleManager.services.searching != null) ? moduleManager.services.searching : require('./searching')(moduleManager));

        // The Security Manager
        moduleManager.services.security = ((moduleManager.services.security != null) ? moduleManager.services.security : require('./security')(moduleManager));

        // The Worker Manager
        moduleManager.services.worker = ((moduleManager.services.worker != null) ? moduleManager.services.worker : require('./worker')(moduleManager));

        // The Workflow Manager  
        moduleManager.services.workflow = ((moduleManager.services.workflow != null) ? moduleManager.services.workflow : require('./workflow')(moduleManager));
        
        // Load the route manager
        _serviceManager.routeManager = require('./routes')(moduleManager)

        // Load the view manager
        _serviceManager.viewManager = require('./views')(moduleManager)

    }()

    return _serviceManager;
};
