/**
 * @fileoverview The following file exposes the nooblyjs module
 *  The core module is reponsible for loading the following core components
 *  - caching: The caching module enables caching for the platform
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
 * Module : The services Module encapsulates all the services of nooblyjs
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

        // The interface manager
        moduleManager.core.services.interface = ((moduleManager.core.services.interface != null) ? moduleManager.core.services.interface : require('./interface')(moduleManager));

        // The Logging Manager   
        moduleManager.core.services.logging = ((moduleManager.core.services.logging != null) ? moduleManager.core.services.logging : require('./logging')(moduleManager));

        // The Caching Manager
        moduleManager.core.services.caching = ((moduleManager.core.services.caching != null) ? moduleManager.core.services.caching : require('./caching')(moduleManager));

        // The Queueing Manager
        moduleManager.core.services.queueing = ((moduleManager.core.services.queueing != null) ? moduleManager.core.services.queueing : require('./queueing')(moduleManager));

        // The Files Manager
        moduleManager.core.services.files = ((moduleManager.core.services.files != null) ? moduleManager.core.services.files : require('./files')(moduleManager));

        // The Measuring Manager
        moduleManager.core.services.measuring = ((moduleManager.core.services.measuring != null) ? moduleManager.core.services.measuring : require('./measuring')(moduleManager));

        // The Notifying Manager
        moduleManager.core.services.notifying = ((moduleManager.core.services.notifying != null) ? moduleManager.core.services.notifying : require('./notifying')(moduleManager));

        // The Scheduling Manager
        moduleManager.core.services.scheduling = ((moduleManager.core.services.scheduling != null) ? moduleManager.core.services.scheduling : require('./scheduling')(moduleManager));

        // The Searching Manager
        moduleManager.core.services.searching = ((moduleManager.core.services.searching != null) ? moduleManager.core.services.searching : require('./searching')(moduleManager));

        // The Security Manager
        moduleManager.core.services.security = ((moduleManager.core.services.security != null) ? moduleManager.core.services.security : require('./security')(moduleManager));

        // The Worker Manager
        moduleManager.core.services.worker = ((moduleManager.core.services.worker != null) ? moduleManager.core.services.worker : require('./worker')(moduleManager));

        // The Workflow Manager  
        moduleManager.core.services.workflow = ((moduleManager.core.services.workflow != null) ? moduleManager.core.services.workflow : require('./workflow')(moduleManager));
        
    }()

    return _serviceManager;
};
