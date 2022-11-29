/**
 * Module : Event Middleware
 * This middelware uses the standard nodejs Event Emitter functionality to raise events to a passed event emitter
 * The event emitter should be passed in the servicemanager[events] or servicemanager.events property
 * 
 * @param serviceManager
 */
'use strict';
const events = require('events');

module.exports = function (moduleManager) {

    // Initialise the event manager
    var _eventManager = {} ;
 
    _eventManager.events = (moduleManager.events != null ? moduleManager.events: new events.EventEmitter());

    /**
     * Method : RaiseEvent calls the global event emitter to raise the event
     * @param {string} name
     * @parm {object} options
    */
    _eventManager.raiseEvent = function (name, options) {
        _eventManager.events.emit(name, options);
    }

    return _eventManager;
};