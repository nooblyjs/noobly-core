'use strict';
const fs = require('fs');
const path = require('path')
var Datastore = require('./core')

/**
 * The Core Data Controller
 * This controller uses in memory objects as a cache. Note that this makes the cache volatile
 * @param {object} serviceManager The parent class that contains the parameters
 * @returns {object} _middleware The instance of the middleware
*/
module.exports = function (parameters) {

    /** Declare the controller */
    var _middleware = {};

    // Private variables
    var _db = {}

    // parameters
    var datafolder = (parameters != null && parameters['datafolder'] != null ? parameters['datafolder'] : './applicationdata')

    /**
    * Set the database collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    */
    _middleware.createCollection = function (db, collection, callback) {
        try{
            _db[collection] = new Datastore(datafolder + '/' + db + '/' + collection +'.db');
            _db[collection].loadDatabase();
            callback(null, true);
        }
        catch (e) {
            callback(e, false);
        }
    }

    /**
    * Create and Index on the collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} index e.g. { fieldName: 'somefield', unique: true, sparse: true }
    * @param {function} callback e.g. function (err){}
    */
    _middleware.createIndex = function (db, collection, index, callback) {
        _db[collection].ensureIndex(index, callback);
    }

    /**
   * Delete and Index on a collection
   * @param {string} db e.g. security 
   * @param {string} collection e.g. users
   * @param {string} index e.g. 'somefield'
   * @param {function} callback e.g. function (err){}
   */
    _middleware.deleteIndex = function (db, collection, index, callback) {
        _db[collection].ensureIndex(index, callback);
    }

    /**
    * Insert data into a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} data e.g. {username: 'steve'} or [{username: 'steve'},{username: 'jeff'}]
    * @param {function} callback e.g. function (err){}
    */
    _middleware.insert = function (db, collection, data, callback) {
        _db[collection].insert(data, callback);
    }

    /**
    * Update data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {string} data {username: 'steve2'} 
    * @param {function} callback e.g. function (err){}
    */
    _middleware.update = function (db, collection, filter, data, callback) {
        _db[collection].update(filter, data, { upsert: true }, callback);
    }

    /**
    * Delete data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {function} callback e.g. function (err){}
    */
    _middleware.delete = function (db, collection, filter, callback) {
        _db[collection].remove(filter, { multi: true }, callback);
    }

    /**
    * Query data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {function} callback function(err,data) {}
    */
    _middleware.findOne = function (db, collection, filter, callback) {
        _db[collection].findOne(filter, callback);
    }

    /**
    * Query data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {string} sort e.g. {dateadded: -1}
    * @param {function} callback function(err,data) {}
    */
    _middleware.find = function (db, collection, filter, sort, callback) {
        if (sort != null) {
            _db[collection].find(filter).sort(sort).exec(callback);
        } else {
            _db[collection].find(filter, callback);
        }
    }

    return _middleware;
}