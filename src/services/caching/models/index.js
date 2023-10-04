/**
 * @fileoverview The following file defines the model requirements for the caching service
 */
'use strict';

/**
 * Models required for caching 
 * @param serviceManager
 */
module.exports = function (serviceManager) {

    var  _modelmanager ={} ;
    _modelmanager.serviceManager = serviceManager;

    return _modelmanager;
};