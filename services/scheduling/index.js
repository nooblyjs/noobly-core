'use strict';
const events = require('events');

/**
 * Scheduling Manager class
 */
module.exports = function (moduleManager) {

    // Initiate the object 
    var _serviceManager = {};

    // Load the configuration controller
    var configuration = moduleManager.core.services.configuration;

    // Load the controllers
    _serviceManager.controller = configuration.has('core.scheduling.contoller') ? require(configuration.get('core.scheduling.contoller')) : require('./middleware/core')(moduleManager);

    // Initialise the event emitter
    _serviceManager.events = new events.EventEmitter();

    // Load the model manager
    _serviceManager.modelManager = require('./models')(moduleManager)

    // Load the route manager
    _serviceManager.routeManager = require('./routes')(moduleManager)

    // Load the views manager
    _serviceManager.routeManager = require('./views')(moduleManager)

    /** 
     * schedule method
     * @param {string} name  
     * @param {string} cron
     * @param {string} callback    
    **/
    _serviceManager.schedule = function (name, cron, callback) {
        _serviceManager.events.emit('scheduling-schedule', name, cron);
        _serviceManager.controller.schedule(cron, callback);
    }

    /** 
     * schedule file  
     * @param {string} name     
     * @param {string} cron
     * @param {string} callback    
    **/
    _serviceManager.scheduleFile = function (name, cron, file) {
        _serviceManager.events.emit('scheduling-schedulefile', cron + ' ' + file);
        _serviceManager.controller.scheduleFile(cron, file);
    }

    return _serviceManager;
};

