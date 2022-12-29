/**
 * @fileoverview The following file is used to test the use of the Shnakkydoodle framework
 * It can be used as a model of how to create a consuming application
 */
 'use strict';
 const events = require('events');
 
 var application = {};
 application.events = new events.EventEmitter();
 application.parameters = {};
 
 // Instantiate the Shnakkydoodle Framework
 var noobly = require('.')(application);
 
 /**
  * Initialise the server
  */
  application.initialise = function () {

     // Add the event listener
     noobly.core.events.addListener('event', function (data) {
      noobly.core.services.logging.debug('Event: type: ' + data.type + ' message: ' + data.message);
     });
 
     // Indicate that the platform has started up
     noobly.core.services.caching.set('noobly-startup', Date());
 
     // Schedule the Shnakkydoodle heartbeat
     noobly.core.services.scheduling.schedule('noobly-core-hearbeat', '1 * * * * *', function () {
      noobly.core.services.logging.log('noobly core heartbeat');
      noobly.core.services.caching.set('noobly-core-running', Date());
     });
 
     // Launch a test server
     noobly.core.services.interface.listen(process.env.PORT || noobly.core.configuration.get('server.port'), function (port) {
        noobly.core.services.logging.warn(noobly.core.configuration.get('application.name') + ': running on ' + port + ' in ' + process.cwd() + '\n');
     });
 
 }();

 
 
 