'use strict';
const {	Worker } = require("worker_threads");
const { randomUUID } = require('crypto');

/**
 * Notifying Manager class
 */
module.exports = function(parameters) {
    
    // Initiate the controller
    var _controller = {};

    // The workers running
    var workers = {};

    /**
     * Create a worker thread with a payload amd callback
     * @param worker The worker file or object to execute e.g. './workers/processlargedata.js'
     * @param payload The json payload to pass to the worker e.g. {location : './data/'}
     * @param callback The worker created callback e.g. function (workerid, worker){}
     * @param messageCallback The method being called e.g. function (result, payload) {}
     * @param errorCallback The method being called e.g. function (error, payload) {}
     * @param exitCallback The method being called e.g. function (exitCode, payload) {}
     */
    _controller.createWorker  = function( worker, payload, callback, messageCallback, errorCallback, exitCallback ){
        var workerid = randomUUID();
        workers[workerid] = new Worker(worker, {workerData: payload})
        workers[workerid].on("message", (result) => {
            messageCallback(workers[workerid], {result,payload});
        });
        workers[workerid].on("error", (error) => {
            errorCallback( workers[workerid], {error,payload});
        });
        workers[workerid].on("exit", (exitCode) => {
            exitCallback(workers[workerid], {exitCode, payload});
        });
        callback(workerid,workers[workerid]);
    }

    /**
     * Retrieve 
     * @param workerid The worker file or object to execute e.g. './workers/processlargedata.js'
     */
    _controller.retrieveWorker = function (workerid, callback) {
        callback(workers[workerid]);
    }
   
    return _controller;
};

