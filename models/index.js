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

        // The Location Model    
        moduleManager.core.models.location = require('./location')(moduleManager);

        // The Product Model    
        moduleManager.core.models.product = require('./product')(moduleManager);

        // The Person Model 
        moduleManager.core.models.person = require('./person')(moduleManager);

    }();

    return _modelsManager;
};
