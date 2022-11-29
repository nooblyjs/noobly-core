'use strict';
var MongoClient = require('mongodb').MongoClient;

module.exports = function (parameters) {

    /** Declare the provider */
    var _controller = {};

    // parameters
    var _url = (parameters != null && parameters['url '] != null ? parameters['url '] : 'mongodb://localhost:27017')

    // Private variables

    /**
    * Set the database collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    */
    _controller.createCollection = async function (db, collection) {
        var client = new MongoClient(_url);
        var database = client.db(db);
        database.collection(collection);
        //await client.close();
    }

    /**
    * Create and Index on the collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} index e.g. { fieldName: 'somefield', unique: true, sparse: true }
    * @param {function} callback e.g. function (err){}
    */
    _controller.createIndex = async function (db, collection, index, callback) {
        var client = new MongoClient(_url);
        var database = client.db(db);
        const coll = database.collection(collection);
        try {
            coll.createIndex(index);
            //await client.close();
            callback();
        }
        catch (e) {
            //await client.close();
            callback(e)
        }
    }

    /**
   * Delete and Index on a collection
   * @param {string} db e.g. security 
   * @param {string} collection e.g. users
   * @param {string} index e.g. 'somefield'
   * @param {function} callback e.g. function (err){}
   */
    _controller.deleteIndex = async function (db, collection, index, callback) {
        throw Exception("Delete Index not implemented on MongoDB provider")
    }

    /**
    * Insert data into a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} data e.g. {username: 'steve'} or [{username: 'steve'},{username: 'jeff'}]
    * @param {function} callback e.g. function (err){}
    */
    _controller.insert = async function (db, collection, data, callback) {
        var client = new MongoClient(_url);
        var database = client.db(db);
        const coll = database.collection(collection);
        try {
            coll.insertMany(data);
            //await client.close();
            callback();
        }
        catch (e) {
            //await client.close();
            callback(e)
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
    _controller.update = async function (db, collection, filter, data, callback) {
        var client = new MongoClient(_url);
        var database = client.db(db);
        const coll = database.collection(collection);
        try {
            coll.updateOne(filter, data);
            // await client.close();
            callback();
        }
        catch (e) {
            //await client.close();
            callback(e)
        }
    }

    /**
    * Delete data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {function} callback e.g. function (err){}
    */
    _controller.delete = async function (db, collection, filter, callback) {
        var client = new MongoClient(_url);
        var database = client.db(db);
        const coll = database.collection(collection);
        try {
            coll.deleteOne(filter);
            // await client.close();
            callback();
        }
        catch (e) { }
        // await client.close();{
        callback(e)
    }


    /**
    * Query data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {function} callback function(err,data) {}
    */
    _controller.findOne = async function (db, collection, filter, callback) {
        var client = new MongoClient(_url);
        var database = client.db(db);
        const coll = database.collection(collection);
        try {
            var data = await coll.findOne(filter);
            //await client.close();
            callback(null, data);
        }
        catch (e) {
            //await client.close();
            callback(e)
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
    _controller.find = async function (db, collection, filter, sort, callback) {
        var client = new MongoClient(_url);
        var database = client.db(db);
        const coll = database.collection(collection);
        try {
            if (sort != null) {
                var data = await coll.find(filter).sort(sort).toArray();
            } else {
                var data = await coll.find(filter).toArray();
            }
            //await client.close();
            callback(null, data);
        }
        catch (e) {
            //await client.close();
            callback(e)
        }
    }

    return _controller;
}