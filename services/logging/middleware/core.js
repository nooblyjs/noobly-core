/**
 * @fileoverview The following file exposes the console logging middleware
 */
'use strict';
var term = require( 'terminal-kit' ).terminal;

/**
 * The embedded logging provider exposes a logging to console implementation for the logging modeul
 */
module.exports = function() {
    
    // The middleware
    var _middleware = {};
    
    // Format the date for the logging
    var datetoString = function (date){
      return date .toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    }
    
    /**
     * Log a debug message to the console
     * @param {string} client that has logged
     * @param {string} The message to be logged
     * @param {function : optional}  callback 
     */
    _middleware.debug = function(client, message, callback){
        term.grey("[" + datetoString(new Date()) + "]" + " [DEBUG] " + "[" + client +"] " +  message + '\n');
        callback(true);
    }

    /**
     * Log and information message to the console
     * @param {string} client that has logged
     * @param {string} The message to be logged
     * @param {function : optional}  callback 
     */
    _middleware.log = function(client, message, callback){
        term.white("[" + datetoString(new Date()) + "]" + " [INFO] " + "[" + client +"] " +  message+ "\n");
        callback(true);
    }
    
     /**
     *  Log a warning message to the console
     * @param {string} client that has logged
     * @param {string} The message to be logged
     * @param {function : optional}  callback 
     */
     _middleware.warn = function(client, message, callback){
        term.red("[" + datetoString(new Date()) + "]" + " [WARN] " + "[" + client + "] " +  message+ "\n");
        callback(true);
    }
    
    /**
     *  Log an error message to the console
     * @param {string} client that has logged
     * @param {string} The message to be logged
     * @param {function : optional}  callback  
     */
    _middleware.error = function(client, message, callback){
        term.bold.red("[" + datetoString(new Date()) + "]" + " [ERROR] " + "[" +client +"] " +  message + "\n");
        callback(true);
    }
    
    return _middleware;
};

