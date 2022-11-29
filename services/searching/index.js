'use strict';

/**
 * Module : Search service
 */
module.exports = function (moduleManager) {

    // Initiate the object 
    var _serviceManager = {};

    // Initialise the middleware container
    _serviceManager.middleware = [];

    // Load the configuration controller
    var configuration = moduleManager.core.services.configuration;

    /**
     * Method : RaiseEvent
     * Note that there may be multiple event middleware's to fire
     * @param {string} name
     * @param {object} options
    */
    _serviceManager.raiseEvent = function (name, options) {
        moduleManager.core.common.middleware.retrieve(_serviceManager, 'raiseEvent').forEach(function (item, index) {
            item.raiseEvent(name, options);
        });
    }

    /** 
     * Method: update : This method will add a record to a search index
     * @param {string} index : The index to add the data too
     * @param {string} data : Tje data to be inserted or updated
     * @param {function} callback : The method to call once complete. function(error, data){ } Note that if this is null a promise is implemented   
    **/
    _serviceManager.updateIndex = function (index, data, callback) {
        _serviceManager.raiseEvent('event', { type: 'update-index', message: 'search: Index: ' + index  + ' updated ', options: { index } });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'updateIndex').updateIndex(index, data, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'updateIndex').updateIndex(index, data, function (success) {
                        resolve(success);
                    })
                });
        }
    }

    /** 
     * Method: delete : This method will delete the records for a specified search string4
     * @param {string} index : The index we are working on
     * @param {string} searchString : The search string
     * @param {function} callback : The method to call once complete. function(error, sucess){ } Note that if this is null a promise is implemented   
    **/
    _serviceManager.deleteIndex = function (index, searchString, callback) {
        _serviceManager.raiseEvent('event', { type: 'delete-index', message: 'search: Index: ' + index + ' ' + searchString + ' executed ', options: { index } });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'updateIndex').deleteIndex(index, searchString, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'updateIndex').deleteIndex(index, searchString, function (success) {
                        resolve(success);
                    })
                });
        }
    }

    /** 
     * Method : search : This method recieves performs a search and calls back the results
     * @param {string} index : The index we are working on
     * @param {string} searchString : The search string
     * @param {function} callback : The method to call once complete. function(error, sucess){ } Note that if this is null a promise is implemented   
    **/
    _serviceManager.searchIndex = function (index, searchString, callback) {
        _serviceManager.raiseEvent('event', { type: 'search', message: 'search: Index: ' + index + ' ' + searchString + ' executed ', options: { index } });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'updateIndex').searchIndex(index, searchString, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'updateIndex').searchIndex(index, searchString, function (success) {
                        resolve(success);
                    })
                });
        }
    }

    /**
    * Initialise the module
    */
    _serviceManager.initialise = function () {

        // Use the default middleware
        moduleManager.core.common.middleware.use(_serviceManager, configuration != null && configuration.has('core.searching.contoller') ? require(configuration.get('core.searching.contoller')) : require('./middleware/core')(moduleManager))

        // Use the default event manager
        moduleManager.core.common.middleware.use(_serviceManager, require('../../common/middleware/events-middleware/events')(moduleManager));

        // Load the model manager
        _serviceManager.modelManager = require('./models')(moduleManager)

        // Load the route manager
        _serviceManager.routeManager = require('./routes')(moduleManager)

        // Load the views manager
        _serviceManager.routeManager = require('./views')(moduleManager)

    }();

    return _serviceManager;
};

