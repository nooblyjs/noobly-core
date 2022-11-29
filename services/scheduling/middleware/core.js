'use strict';
const schedule = require('node-schedule');

/**
 * The schedule manager object exposes various schedule providers using dependancy injection
 */
module.exports = function() {
    
    var _embedded = {};
    
    /** 
     * schedule method
     * @param {string} cron
     * @param {string} method    
    **/
    _embedded.schedule = function(cron, method){
        const job = schedule.scheduleJob(cron, method);
    }

    /** 
     * schedule file
     * @param {string} cron
     * @param {string} file    
    **/
   _embedded.scheduleFile = function(cron, file){
    const job = schedule.scheduleJob(cron, function(){require(file) });
}
  
    return _embedded;
};
