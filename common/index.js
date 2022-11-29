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

    var _commonManager = {};

    /**
     * Initialise function
     */
    _commonManager.initialise = function () {

        // The middleware utility
        moduleManager.common.middleware = (( moduleManager.common.middleware != null) ?  moduleManager.common.middleware : require('./middleware/')(moduleManager));

        // The modules utility
        moduleManager.common.modules = (( moduleManager.common.modules != null) ?  moduleManager.common.modules : require('./modules/')(moduleManager));

        // The schema utility
        moduleManager.common.schema = (( moduleManager.common.schema != null) ?  moduleManager.common.schema : require('./schema/'));

    }()

    return _commonManager
}