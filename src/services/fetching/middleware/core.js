'use strict';
const https = require('https');
const url = require('url'); 


/**
 * Data Fetching local provider
 */
module.exports = function (parameters) {

    /** Initiate the object */
    var _controller = {};

     /**
      * Enable a fetch request
      * @param {string} address 
      * @param {object} options 
      * @param {object} callback 
      * @param {object} errorCallback 
      */
     _controller.fetch = function (address, options, callback, errorCallback) {
         var result = '';

         const q = url.parse(address, true); 

         // Perform api request
         const req = https.request({
             hostname: q.host,
             port: q.port,
             path: q.path ,
             method: "GET",
         }, res => {res.on('data', d => {
                 result += d;
                 callback(result);
             });
         });
 
         // On error
         req.on('error', error => {
             errorCallback(error);
         });
 
         // End the request
         req.end();
     }

    return _controller;
};

