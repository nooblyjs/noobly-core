'use strict';
const { Pool, Client } = require('pg')

module.exports = function (parameters) {

    /** Declare the controller */
    var _controller = {};


    const pool = new Pool({
      user: 'dbuser',
      host: 'database.server.com',
      database: 'mydb',
      password: 'secretpassword',
      port: 3211,
    })


    /**
    * Set the database collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    */
    _controller.createCollection = function (db, collection) {
        pool.query('SELECT NOW()', (err, res) => {
        console.log(err, res)
        pool.end()
        })
    }

    /**
    * Create and Index on the collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} index e.g. { fieldName: 'somefield', unique: true, sparse: true }
    * @param {function} callback e.g. function (err){}
    */
    _controller.createIndex = function (db, collection, index, callback) {
       
    }

    /**
   * Delete and Index on a collection
   * @param {string} db e.g. security 
   * @param {string} collection e.g. users
   * @param {string} index e.g. 'somefield'
   * @param {function} callback e.g. function (err){}
   */
    _controller.deleteIndex = function (db, collection, index, callback) {
        
    }

    /**
    * Insert data into a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} data e.g. {username: 'steve'} or [{username: 'steve'},{username: 'jeff'}]
    * @param {function} callback e.g. function (err){}
    */
    _controller.insert = function (db, collection, data, callback) {
        
    }

    /**
    * Update data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {string} data {username: 'steve2'} 
    * @param {function} callback e.g. function (err){}
    */
    _controller.update = function (db, collection, filter, data, callback) {
        
    }

    /**
    * Delete data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {function} callback e.g. function (err){}
    */
    _controller.delete = function (db, collection, filter, callback) {
        
    }

    /**
    * Query data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {function} callback function(err,data) {}
    */
    _controller.findOne = function (db, collection, filter, callback) {
        
    }

    /**
    * Query data from a collection
    * @param {string} db e.g. security 
    * @param {string} collection e.g. users
    * @param {string} filter e.g. {username: 'steve'}
    * @param {string} sort e.g. {dateadded: -1}
    * @param {function} callback function(err,data) {}
    */
    _controller.find = function (db, collection, filter, sort, callback) {

    }

    return _controller;
}