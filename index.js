/**
 * @fileoverview This instantiates instantiates the noobly core engine
 */
'use strict';
var events = require('events');

/**
 * Module: noobly-core
 * The noobly.core Framework publishes a number of framewor enablers that allows for the rapid development of a solution
 * @param {object} moduleManager The calling system which the framework will inherit details from existing behavour.
 * @returns {object} noobly The noobly object
 */
module.exports = function (moduleManager) {

  // Instantiate the noobly object and its children
  var noobly = ((noobly != null) ? noobly : {});
  noobly.core = ((noobly.core != null) ? noobly.core : {});
  noobly.core.common = ((noobly.core.common != null) ? noobly.core.common : {});
  noobly.core.models = ((noobly.core.models != null) ? noobly.core.models : []);
  noobly.core.routes = ((noobly.core.routes != null) ? noobly.core.routes : {});
  noobly.core.services = ((noobly.core.services != null) ? noobly.core.services : {});
  noobly.core.views = ((noobly.core.views != null) ? noobly.core.views : {});
  noobly.core.middleware = [];

  // Instaniate Module Manager 
  moduleManager = (moduleManager != null ? moduleManager: {});

  // Set the parameters object from the parent object else create one
  noobly.parameters = ((moduleManager.parameters != null) ? moduleManager.parameters : {});

  // Set the event engine
  noobly.core.events = (moduleManager.events != null ? moduleManager.events : new events.EventEmitter());

  // Load the common module
  require('./src/common')(noobly);

  // Load the models module
  require('./src/models')(noobly);

  // Load the services module
  require('./src/services')(noobly);

  // Load the models module
  require('./src/routes')(noobly);

  // Load the models module
  require('./src/views')(noobly);

  /**
   * Helper method to show any startup information
   */
  noobly.printStatus = function (port) {
    console.log('========================================================================')
    console.log('Module Status: Running as module: ' + noobly.core.common.modules.isModule());
    console.log(': Marketing: http://127.0.0.1:' + port + '/');
    console.log(': Application: http://127.0.0.1:' + port + '/application/');
    console.log(': Backoffice: http://127.0.0.1:' + port + '/backoffice/');
    console.log(': API: http://127.0.0.1:' + port + '/services/api/docs/');
    console.log('')   
    console.log(': Logging API: http://127.0.0.1:' + port + '/logging/api/status/');
    console.log('========================================================================')
  }

  /**
   * Method: initialise
   * This function loads all the required dependancies for the project.
   *  - common : Various utilities that can be used across the entire solution
   *  - models : The models module expose common data structures for use by the modules
   *  - services : The services modules expose all the core features
   *  - routes : The routes module expose the apis available for the noobly framework
   *  - views : The views module exposes any UI for the framework
   */
  noobly.initialise = function () {

    // Indicate the services and their configuration
    if (noobly.core.configuration.get('server.port') != null){
      noobly.printStatus(process.env.PORT || noobly.core.configuration.get('server.port'))
    }
  
  };

  return noobly;
}