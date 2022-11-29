'use strict';
const events = require('events');

/**
 * The Core Cache Controller
 * This controller uses in memory objects as a cache. Note that this makes the cache volatile
 * @param {object} moduleManager The parent class that contains the parameters
 * @returns {object} _serviceManager The instance of the service manager
*/
module.exports = function (moduleManager) {

    /** Initiate the object */
    var _serviceManager = {};

    /** Assign the default controller */
    _serviceManager.middleware = 'middleware' in moduleManager.parameters ? moduleManager.parameters['middleware'](moduleManager) : require('./middleware/core')(moduleManager);

    // Initialise the event emitter
    _serviceManager.events = new events.EventEmitter();

    // Load the model manager
    _serviceManager.modelManager = require('./models')(moduleManager)

    // Load the route manager
    _serviceManager.routeManager = require('./routes')(moduleManager)

    /**
    * Set the database collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    */
    _serviceManager.createCollection = function (db, collection, callback) {
        _serviceManager.events.emit('collection-create', { "db": db, "collection": collection });
        if (callback != null) {
            _serviceManager.middleware.createCollection(db, collection, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    _serviceManager.middleware.createCollection(db, collection, function (err, success) {
                        console.log('Create Collection');
                        resolve({err,success});
                    })
                });
        }
    }

    /**
    * Create and Index on the collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} index e.g. { fieldName: 'somefield', unique: true, sparse: true }
    * @param {function} callback e.g. function (err){}
    */
    _serviceManager.createIndex = function (db, collection, index, callback) {
        _serviceManager.events.emit('index-create', { "db": db, "collection": collection, "index": index });
        if (callbck != null) {
            _serviceManager.middleware.createIndex(db, collection, index, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    serviceManager.middleware.createIndex(db, collection, index, function (success) {
                        resolve(success);
                    })
                });
        }
    }

    /**
   * Delete and Index on a collection
   * @param {string} db e.g. security 
   * @param {string} collection e.g. users
   * @param {string} index e.g. 'somefield'
   * @param {function} callback e.g. function (err){}
   */
    _serviceManager.deleteIndex = function (db, collection, indexname, callback) {
        _serviceManager.events.emit('index-delete', { "db": db, "collection": collection, "index": indexname });
        if (callbck != null) {
            _serviceManager.middleware.deleteIndex(db, collection, indexname, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    serviceManager.middleware.deleteIndex(db, collection, indexname, function (success) {
                        resolve(success);
                    })
                });
        }
    }

    /**
    * Insert data into a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} data e.g. {username: 'steve'} or [{username: 'steve'},{username: 'jeff'}]
    * @param {function} callback e.g. function (err){}
    */
    _serviceManager.insert = function (db, collection, data, callback) {
        _serviceManager.events.emit('data-insert', { "db": db, "collection": collection });
        if (callback != null) {
            _serviceManager.middleware.insert(db, collection, data, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    _serviceManager.middleware.insert(db, collection, data, function (err,data) {
                        resolve({err,data});
                    })
                });
        }
    }

    /**
    * Update data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {string} data {username: 'steve2'} 
    * @param {function} callback e.g. function (err){}
    */
    _serviceManager.update = function (db, collection, fiter, data, callback) {
        _serviceManager.events.emit('data-update', { "db": db, "collection": collection });
        if (callback != null) {
            _serviceManager.middleware.update(db, collection, fiter, data, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    _serviceManager.middleware.update(db, collection, fiter, data, function (err,data) {
                        resolve({err,data});
                    })
                });
        }
    }

    /**
    * Delete data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {function} callback e.g. function (err){}
    */
    _serviceManager.delete = function (db, collection, fiter, callback) {
        _serviceManager.events.emit('data-delete', { "db": db, "collection": collection });
        if (callback != null) {
            _serviceManager.middleware.delete(db, collection, fiter, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    _serviceManager.middleware.delete(db, collection, fiter, function (err,data) {
                        resolve({err,data});
                    })
                });
        }
    }

    /**
    * Query data from a collection for the first document
    * If there is no document found it will return a null
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} data
    * @param {function} callback (err,data)
    */
    _serviceManager.findOne = function (db, collection, filter, sort, callback) {
        _serviceManager.events.emit('data-findone', { "db": db, "collection": collection });
        if (callback != null) {
            _serviceManager.middleware.findOne(db, collection, filter, sort, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    _serviceManager.middleware.findOne(db, collection, filter, sort, function (err, data) {
                        resolve({err, data});
                    })
                });
        }
    }

    /**
    * Query data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {string} sort e.g. {dateadded: -1}
    * @param {function} callback function(err,data) {}
    */
    _serviceManager.find = function (db, collection, filter, sort, callback) {
        _serviceManager.events.emit('data-find', { "db": db, "collection": collection });
        if (callback != null) {
            _serviceManager.middleware.find(db, collection, filter, sort, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    _serviceManager.middleware.find(db, collection, filter, sort, function (err, data) {
                        resolve({err, data});
                    })
                });
        }
    }

    return _serviceManager;
};

