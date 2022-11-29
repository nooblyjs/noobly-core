'use strict';
var term = require( 'terminal-kit' ).terminal ;

/**
 * The embedded logging provider exposes a simple con
 */
module.exports = function() {
    
    var _console = {};
    
    var datetoString = function (date){
      return date .toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    }
    
    /**
     * Log a debug message
     * @client {string} cl
     * @param {string} message
     */
     _console.debug = function(client, message){
        term.grey("[" + datetoString(new Date()) + "]" + " [DEBUG] " + "[" + client +"] " +  message + '\n');
    }

    /**
     * Log a message
     * @client {string} cl
     * @param {string} message
     */
    _console.log = function(client, message){
        console.log("[" + datetoString(new Date()) + "]" + " [INFO] " + "[" + client +"] " +  message);
    }
    
     /**
     *  Log a error
     * @param {string} message
     */
    _console.warn = function(client, message){
        term.red("[" + datetoString(new Date()) + "]" + " [WARN] " + "[" + client + "] " +  message);
    }
    
    /**
     *  Log a error
     * @param {string} message
     */
    _console.error = function(client, message){
        term.bold.red("[" + datetoString(new Date()) + "]" + " [ERROR] " + "[" +client +"] " +  message);
    }
    
    return _console;
};

