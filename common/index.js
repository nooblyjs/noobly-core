/**
 * @fileoverview The following file exposes the nooblyjs module
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
 * Module : The services Module encapsulates all the services of nooblyjs
 * @param {object} moduleManager : The calling object 
 * @returns {object} _serviceManager
 */
module.exports = function (moduleManager) {

    var _commonManager = {};

    /**
     * Initialise function
     */
    _commonManager.initialise = function () {

        // The middleware utility
        moduleManager.core.configuration = ((moduleManager.core.configuration != null) ? moduleManager.core.configuration : require('./configuration/core')(moduleManager));

        // The middleware utility
        moduleManager.core.common.middleware = ((moduleManager.core.common.middleware != null) ? moduleManager.core.common.middleware : require('./middleware/')(moduleManager));

        // The modules utility
        moduleManager.core.common.modules = ((moduleManager.core.common.modules != null) ? moduleManager.core.common.modules : require('./modules/')(moduleManager));

        // The schema utility
        moduleManager.core.common.dataaccess = ((moduleManager.core.common.dataaccess != null) ? moduleManager.core.common.dataaccess : require('./dataaccess/'));

        // The interface manager
        moduleManager.core.services.interface = ((moduleManager.core.services.interface != null) ? moduleManager.core.services.interface : require('./interface')(moduleManager));


    }()

    return _commonManager
}
