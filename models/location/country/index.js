var connect = require('../../../common/dataaccess').connect;
var Document = require('../../../common/dataaccess').Document;
var EmbeddedDocument = require('../../../common/dataaccess').EmbeddedDocument;

/**
 * The Countries Model
 * @param moduleManager
 */
module.exports = function (moduleManager) {

    // Instantiate the returned object
    var _modelmanager = {};

    // Set the model manager database uri
    _modelmanager.uri = moduleManager.uri;


    /**  
     * The country object
    */
    class Country extends Document {
        constructor() {
            super();

            /**
             * The country code e.g. ZA
             */
            this.code = {
                type: String,
                default: ''
            };

            /** 
             * The country name e.g. South Africa 
            */
            this.name = {
                type: String,
                default: ''
            };
        }
    }

    /**
     * Method : Create a Country Object 
     * @param {string} code The country code e.g. ZA
     * @param {array} name The country name e.g. South Africa 
     * @param {function} callback The callback method
     */
    _modelmanager.create = function (code, name, callback) {
        connect(_modelmanager.uri).then(function (db) {
            Country.findOneAndDelete({ code: code }).then(function () {
                var _obj = Country.create();
                _obj.code = code;
                _obj.name = name;
                _obj.save().then(callback(_obj));
            });
        });
    }

    /**
     * Method: Retrieve 
     * @param {string} filter The filter to use
     * @param {function} callback The callback method
     */
    _modelmanager.retrieve = function (filter, callback) {
        connect(_modelmanager.uri).then(function (db) {
            Country.find(filter).then(function (data) {
                callback(data);
            })
        });
    }

    return _modelmanager;
};