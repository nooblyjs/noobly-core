/**
 * @fileoverview The following file exposes the console logging middleware
 */
'use strict';
var term = require( 'terminal-kit' ).terminal ;

/**
 * The embedded logging provider exposes a simple con
 */
module.exports = function() {
    
    // The object
    var _middleware = {};
    
    // Format a date
    var datetoString = function (date){
      return date .toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    }
    
    /**
     * Log a debug message
     * @param {string} client that has logged
     * @param {string} message
     * @param {function : optional}  callback 
     */
    _middleware.debug = function(client, message, callback){
        term.grey("[" + datetoString(new Date()) + "]" + " [DEBUG] " + "[" + client +"] " +  message + '\n');
        callback(true);
    }

    /**
     * Log a message
     * @param {string} client that has logged
     * @param {string} message
     * @param {function : optional}  callback 
     */
    _middleware.log = function(client, message, callback){
        term.white("[" + datetoString(new Date()) + "]" + " [INFO] " + "[" + client +"] " +  message+ "\n");
        callback(true);
    }
    
     /**
     *  Log a error
     * @param {string} client that has logged
     * @param {string} message
     * @param {function : optional}  callback 
     */
     _middleware.warn = function(client, message, callback){
        term.red("[" + datetoString(new Date()) + "]" + " [WARN] " + "[" + client + "] " +  message+ "\n");
        callback(true);
    }
    
    /**
     *  Log a error
     * @param {string} client that has logged
     * @param {string} message
     * @param {function : optional}  callback 
     */
    _middleware.error = function(client, message, callback){
        term.bold.red("[" + datetoString(new Date()) + "]" + " [ERROR] " + "[" +client +"] " +  message + "\n");
        callback(true);
    }
    
    return _middleware;
};

