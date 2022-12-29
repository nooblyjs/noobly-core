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

  // Set the parameters object from the parent object else create one
  noobly.parameters = ((moduleManager.parameters != null) ? moduleManager.parameters : {});

  // Set the event engine
  noobly.core.events = (moduleManager.events != null ? moduleManager.events : new events.EventEmitter());

  /**
   * Helper method to show any startup information
   */
  noobly.printStatus = function () {
    console.log('========================================================================')
    console.log('Module Status: Running as module: ' + noobly.core.common.modules.isModule());
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

    // Load the common module
    require('./common')(noobly);

    // Load the models module
    require('./models')(noobly);

    // Load the services module
    require('./services')(noobly);

    // Load the models module
    require('./routes')(noobly);

    // Load the models module
    require('./views')(noobly);

    // Print the status
    noobly.printStatus()

  }();

  return noobly;
}