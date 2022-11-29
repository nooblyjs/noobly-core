'use strict';
const events = require('events');

/**
 * Shopping Module
 */
module.exports = function (parameters) {

    /** Initiate the object */
    var _modelsManager = {};

    /** local parameters */
    _modelsManager.parameters = (parameters != null ? parameters : {})

    // Initialise the event emitter
    _modelsManager.events = new events.EventEmitter();

    // The Location Model    
    _modelsManager.location = require('./location')(parameters);
    parameters['models.location'] = _modelsManager.location;

    // The Product Model    
    _modelsManager.product =  require('./product')(parameters);
    parameters['models.product'] = _modelsManager.product;

    // The Person Model 
    _modelsManager.person =  require('./person')(parameters);
    parameters['models.person'] = _modelsManager.person;

    return _modelsManager;
};
