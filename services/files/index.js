'use strict';
const events = require('events');
const express = require('express');

/**
 * Module : File Manager
 * The file manager object exposes various file management providers using dependancy injection based on the needs of the application
 * The providers that can be used are as follows
 *  - provider-core : The core provider writes files locally
 *  - provider-aws : The core provider writes files to AWS S3
 *  - provider-core : The core provider writes files Azure Blob Storage
 * @params parameters object that could have the follows
 *  - queue-provider : default: ./controllers/provider-core The reference to the provider to be used that can be read from the configuration    
 *  - queue-aws : default: ./controllers/provider-core The reference to the provider to be used that can be read from the configuration 
 *  - queue-azure : default: ./controllers/provider-core The reference to the provider to be used that can be read from the configuration  
 * @events The following events are raised by this modile
 *  - files-create : A files 'create' call has been called
 *  - files-append : A files 'append' call has been called
 *  - files-rename : A files 'rename' call has been called
 *  - files-delete : A files 'delete' call has been called
 *  - files-readfile : A files 'read file' call has been called
 *  - files-readdirectory : A files 'read directory' call has been called
 *  - files-fileexists : A files 'file exists' call has been called  
 * @interfaces
 *  - POST  https://domain/server/logging/has/:level : logs data
 *  - GET  https://domain/server/queueing/ping : returns a "Pong" 
*/
module.exports = function (moduleManager) {

    // Initiate the object 
    var _serviceManager = {};

    // Initiate the object 
    var _serviceManager = {};

    // Initialise the middleware container
    _serviceManager.middleware = [];

    /**
     * Method : RaiseEvent
     * Note that there may be multiple event middleware's to fire
     * @param {string} name : The name of the even being fired
     * @param {object} options : An object holding the specific parameters
    */
    _serviceManager.raiseEvent = function (name, options) {
        moduleManager.core.common.middleware.retrieve(_serviceManager, 'raiseEvent').forEach(function (item, index) {
            item.raiseEvent(name, options);
        });
    }

    /**
     * Create a file
     * @param {String} filename
     * @param {object} content
     * @param {object} callback
    */
    _serviceManager.create = function (filename, content, callback) {
        _serviceManager.raiseEvent('event', { type: 'files-create', message: 'file created: ' + filename, options: { filename } });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieveFirst.create(filename, content, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst.create(filename, content, function (status) {
                        resolve(status);
                    })
                });
        }
    }


    /**
     * Append to file
     * @param {String} filename
     * @param {object} content
     * @param {object} callback
     */
    _serviceManager.appendAsync = function (filename, content, callback) {
        _serviceManager.events.emit('files-append', filename);
        _serviceManager.provider.append(filename, content, callback)
    }

    /**
     * Append to file
     * @param {String} filename
     * @param {object} content
     * @param {object} callback
     */
    _serviceManager.append = function (filename, content, callback) {
        _serviceManager.raiseEvent('event', { type: 'files-append', message: 'file appended: ' + filename, options: { filename } });
        if (callback != null) {
            _serviceManager.provider.append(filename, content, callback)
        } else {

        }
        _serviceManager.provider.append(filename, content, callback)
    }

    /**
    * Rename to file
    * @param {String} filename
    * @param {String} newfilename
    */
    _serviceManager.rename = function (filename, newfilename, callback) {
        _serviceManager.events.emit('files-rename', filename + ' ' + newfilename);
        _serviceManager.provider.rename(filename, newfilename, callback)
    }

    /**
     * Delete a file
     * @param {String} filename
     */
    _serviceManager.delete = function (filename, callback) {
        _serviceManager.events.emit('files-delete', filename);
        _serviceManager.provider.delete(filename, callback)
    }

    /**
     * Read a File
     * @param {String} filePath
     */
    _serviceManager.readFile = function (filePath, callback) {
        _serviceManager.events.emit('files-readfile', filePath);
        _serviceManager.provider.readFile(filePath, callback)
    }

    /**
     * List a directory
     * @param {String} directory
     */
    _serviceManager.readDirectory = function (directory, callback) {
        _serviceManager.events.emit('files-readdirectory', directory);
        _serviceManager.provider.readDirectory(directory, callback)
    }

    /**
     * Does a file exist
     * @param {String} directory
     */
    _serviceManager.exists = function (filePath, callback) {
        _serviceManager.events.emit('files-fileexists', filePath);
        _serviceManager.provider.exists(filePath, callback)
    }

    /**
* Initialise Method
*/
    _serviceManager.initialise = function () {

        // Use the default middleware
        moduleManager.core.common.middleware.use(_serviceManager, moduleManager.core.configuration.has('core.files.contoller') ? require(moduleManager.core.configuration.get('core.files.contoller')) : require('./middleware/core')(moduleManager))

        // Use the default event manager
        moduleManager.core.common.middleware.use(_serviceManager, require('../../common/events/events.js')(moduleManager));

        // Load the model manager
        _serviceManager.modelManager = require('./models')(moduleManager)

        // Load the route manager
        _serviceManager.routeManager = require('./routes')(moduleManager)

        // Load the views manager
        _serviceManager.viewManager = require('./views')(moduleManager)

    }();

    return _serviceManager;
};
