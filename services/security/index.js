'use strict';

/**
 * Module : Security Service
 */
module.exports = function (moduleManager) {

    // Initiate the object 
    var _serviceManager = {};

    // Initialise the middleware container
    _serviceManager.middleware = [];

    // Load the configuration controller
    var configuration = moduleManager.services.configuration;

    /**
     * Method : RaiseEvent
     * Note that there may be multiple event middleware's to fire
     * @param {string} name
     * @param {object} options
    */
    _serviceManager.raiseEvent = function (name, options) {
        moduleManager.common.middleware.retrieve(_serviceManager, 'raiseEvent').forEach(function (item, index) {
            item.raiseEvent(name, options);
        });
    }

    /**
    * Initialise the module
    */
    _serviceManager.initialise = function () {

        // Use the default middleware
        moduleManager.common.middleware.use(_serviceManager, configuration != null && configuration.has('core.security.contoller') ? require(configuration.get('core.security.contoller')) : require('./middleware/core')(moduleManager))

        // Use the default event manager
        moduleManager.common.middleware.use(_serviceManager, require('../../common/middleware/events-middleware/events')(moduleManager));

        // Load the model manager
        _serviceManager.modelManager = require('./models')(moduleManager)

        // Load the route manager
        _serviceManager.routeManager = require('./routes')(moduleManager)

        // Load the views manager
        _serviceManager.routeManager = require('./views')(moduleManager)

    }();

    return _serviceManager;
};
