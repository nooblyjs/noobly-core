'use strict';
const events = require('events');

/**
 * Person Model Manager
 * 
 * @param {object} moduleManager The parent module
 */
module.exports = function (moduleManager) {

    /** Initiate the object */
    var _modelManager = {};

    // Initialise the event emitter
    _modelManager.events = new events.EventEmitter();

    // Initialise the view manager    
    _modelManager.initialise = function(){

    }();

    return _modelManager;
};