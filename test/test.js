/**
 * @fileoverview The following file is used to test the use of the noobly core framework
 */
'use strict';
const events = require('events');

var application = {};
application.events = new events.EventEmitter();
application.parameters = {};

// Instantiate the noobly Framework
var noobly = require('..')(application);

/**
 * Initialise the server
 */
application.initialise = function () {

}();