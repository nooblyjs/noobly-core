'use strict';
const events = require('events');

/**
 * Shopping Module
 */
module.exports = function (moduleManager) {

    /** Initiate the object */
    var _modelsManager = {};

    // Initialise the view manager    
    _modelsManager.initialise = function () {

        // Load the models
        moduleManager.core.common.modules.loadChildModules(moduleManager.core, 'models', './models/location/country' );

        // The Location Model    
        moduleManager.core.models.location = require('./location')(moduleManager);

        // The Person Model 
        moduleManager.core.models.person = require('./person')(moduleManager);

    }();

    return _modelsManager;
};
