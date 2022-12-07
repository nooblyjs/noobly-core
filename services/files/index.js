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

    // Load the controllers
    _serviceManager.controller = moduleManager.core.configuration.has('core.files.contoller')? require(moduleManager.core.configuration.get('core.files.contoller')) : require('./middleware/core')(moduleManager);

    // Initialise the event emitter
    _serviceManager.events = new events.EventEmitter();

    // Load the model manager
    _serviceManager.modelManager = require('./models')(moduleManager)

    // Load the route manager
    _serviceManager.routeManager = require('./routes')(moduleManager)

    // Load the views manager
    _serviceManager.routeManager = require('./views')(moduleManager)

    /**
     * Create a file asynchronous
     * @param {String} filename
     * @param {object} content
     * @param {object} callback
     */
    _serviceManager.createAsync = function (filename, content, callback) {
        _serviceManager.events.emit('files-create', filename);
        _serviceManager.provider.create(filename, content, callback)
    }


    /**
     * Create a file
     * @param {String} filename
     * @param {object} content
     */
    _serviceManager.create = function (filename, content, callback) {
        _serviceManager.events.emit('files-create', filename);
        return new Promise(
            (resolve, reject) => {
                _serviceManager.provider.create(filename, content, function (status) {
                    resolve(status);
                })
            });
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
        _serviceManager.events.emit('files-append', filename);
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
     * Load the API endpoints of the service
     * @param {object} app
     */
    _serviceManager.registerAPIs = function (app) {
        app.use(express.json())

        // The create file command
        app.route('/server/files/create/:filename').post(function (req, res) {
            _serviceManager.enqueue(req.params.queue, req.body.data)
            res.status(200).send('success');
        });

        // The append file command
        app.route('/server/files/append/:filename').post(function (req, res) {
            _serviceManager.enqueue(req.params.queue, req.body.data)
            res.status(200).send('success');
        });

        // The rename file command
        app.route('/server/files/rename/:filename/:new_filename').get(function (req, res) {
            _serviceManager.dequeue(req.params.queue).then(data => res.status(200).send(data));
        });

        // The delete file command
        app.route('/server/files/delete/:filename').delete(function (req, res) {
            _serviceManager.subscribe(req.params.topic, req.params.subscriber)
            res.status(200).send('success');
        });

        // The topics send command
        app.route('/server/topics/send/:topic').post(function (req, res) {
            _serviceManager.send(req.params.topic, req.body.data)
            res.status(200).send('success');
        });

        // The topic subscribe command
        app.route('/server/topics/receive/:topic/:subscriber').get(function (req, res) {
            _serviceManager.receive(req.params.topic, req.params.subscriber).then(data => res.status(200).send(data));
        });

        // The server ping
        app.route('/server/queueing/ping').get(function (req, res) {
            res.status(200).send('success');
        });
    }

    return _serviceManager;
};

/*
var express = require('express');
var router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: os.tmpdir() });

router.post('/upload', upload.single('file'), function(req, res) {
  const title = req.body.title;
  const file = req.file;

  console.log(title);
  console.log(file);

  res.sendStatus(200);
});

*/