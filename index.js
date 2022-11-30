/**
 * @fileoverview This instantiates instantiates the noobs core engine
 */
'use strict';
var events = require('events');

/**
 * Module: noobs-core
 * The noobs.core Framework publishes a number of framewor enablers that allows for the rapid development of a solution
 * @param {object} moduleManager The calling system which the framework will inherit details from existing behavour.
 * @returns {object} noobs The noobs object
 */
module.exports = function (moduleManager) {

  // Instantiate the noobs object and its children
  var noobs = ((noobs != null) ? noobs : {});
  noobs.core = ((noobs.core != null) ? noobs.core : {});
  noobs.core.common = ((noobs.core.common != null) ? noobs.core.common : {});
  noobs.core.models = ((noobs.core.models != null) ? noobs.core.models : []);
  noobs.core.routes = ((noobs.core.routes != null) ? noobs.core.routes : {});
  noobs.core.services = ((noobs.core.services != null) ? noobs.core.services : {});
  noobs.core.views = ((noobs.core.views != null) ? noobs.core.views : {});
  noobs.core.middleware = [];

  // Set the parameters object from the parent object else create one
  noobs.parameters = ((moduleManager.parameters != null) ? moduleManager.parameters : {});

  // Determine if we are running as a module
  moduleManager.parameters['isModule'] = (module.parent.path.indexOf('noobs') == -1);
  console.log('Noobs JS core running as module: ' + moduleManager.parameters['isModule'] )
  console.log('Noobs JS core parent path: ' + module.parent.path )

  // Set the event engine
  noobs.core.events = (moduleManager.events != null ? moduleManager.events : new events.EventEmitter());

  /**
   * Method: initialise
   * This function loads all the required dependancies for the project.
   *  - common : Various utilities that can be used across the entire solution
   *  - models : The models module expose common data structures for use by the modules
   *  - services : The services modules expose all the core features
   *  - routes : The routes module expose the apis available for the noobs framework
   *  - views : The views module exposes any UI for the framework
   */
   noobs.initialise = function () {

    // Load the common module
    require('./common')(noobs);

    // Load the models module
    require('./models')(noobs);

    // Load the services module
    require('./services')(noobs);

    // Load the models module
    require('./routes')(noobs);

    // Load the models module
    require('./views')(noobs);

  }();

  return noobs;
}