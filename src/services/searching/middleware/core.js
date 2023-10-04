'use strict';
const liqe = require('liqe')
const path = require('path');
const fs = require('fs');

/**
 * The search manager object exposes various search providers using dependancy injection
 */
module.exports = function () {

    var _middleware = {};
    _middleware.indexes = [];
    _middleware.indexPath = path.join(__dirname, 'data/indexes');

    /**
     * Load all the indexes in a folder
     */
    var loadIndexes = async function () {
        await fs.promises.mkdir(_middleware.indexPath, { recursive: true })
        await fs.readdir(_middleware.indexPath, function (err, files) {
            if (err) {
                return err
            } 
            files.forEach(function (file) {
                fs.readFile(_middleware.indexPath + '/' + file, (err, data) => {
                    _middleware.indexes[path.parse(file).name] = JSON.parse(data);
                });
            });

        })
    }

    /**
     * Save all the indexes in memory to their files
     */
    var saveIndexes = async function () {
        await fs.promises.mkdir(_middleware.indexPath, { recursive: true })
        _middleware.indexes.forEach(function (item, index) {
                fs.writeFile(indexPath + '/' + item + '.json', JSON.stringify(index), (err) => {
            });
        });
    }

    /** 
     * Method: updateIndex : This method will add a record to a search index
     * @param {string} indexname : The index to add the data too
     * @param {string} data : Tje data to be inserted or updated
     * @param {function} callback : The method to call once complete. function(error, data){ } Note that if this is null a promise is implemented   
    **/
    _middleware.updateIndex = function (indexname, data, callback) {
        if (_middleware.indexes[indexname] == null){
            _middleware.indexes[indexname] = [];
        }
        for (var i = 0; i < data.length; i++) {
            _middleware.indexes[indexname].push(data[i]);
        }
        saveIndexes();
        callback(true)
    }

    /** 
     * Method: deleteIndex : This method will delete the records for a specified search string
     * @param {string} indexname : The index to add the data too
     * @param {string} searchString
     * @param {function} callback : The method to call once complete. function(error, sucess){ } Note that if this is null a promise is implemented   
    **/
    _middleware.deleteIndex = function (indexname, searchString, callback) {
    }

    /** 
     * Method : searchIndex : This method recieves performs a search and calls back the results
     * @param {string} indexname : The index to add the data too
     * @param {string} searchString : The search string
     * @param {function} callback : The method to call once complete. function(error, sucess){ } Note that if this is null a promise is implemented   
    **/
    _middleware.searchIndex = function (indexname, searchString, callback) {
        console.log(_middleware.indexes);
        callback(liqe.filter(liqe.parse(searchString), _middleware.indexes[indexname]))
    }

    /**
     * Initialise the middleware
     */
    _middleware.initalise = function () {

        // Load all the indexes
        loadIndexes();

        // Create the save index mentod
        setTimeout(saveIndexes, 1500, '');

    }();


    return _middleware;
};
