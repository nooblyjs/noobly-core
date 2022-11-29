var connect = require('../../../../../common/schema').connect;
var Document = require('../../../../../common/schema').Document;
var EmbeddedDocument = require('../../../../../common/schema').EmbeddedDocument;

/**
 * Manage the models
 * 
 * @param serviceManager
 */
module.exports = function (serviceManager) {

    var _modelmanager = {};
    _modelmanager.uri = serviceManager.uri;

    /**  
     * The Project object
    */
    class Project extends Document {
        constructor() {
            super();

            this.name = {
                type: String,
                default: ''
            };

            
            this.state = {
                type: String,
                default: ''
            };
        }
    }

    /**
     * Method : Create a project
     * Create a project
     * @param {string} name The plan name
     * @param {string} initalstate The plan transitions
     * @param {function} callback The callback method
     */
    _modelmanager.createProject = function (name, state, callback) {
        connect(_modelmanager.uri).then(function (db) {
            var _project = Plan.create();
            _project.name = name;
            _project.state = state
            _project.save().then(callback(_project));
        });
    }

    /**
     * Retrieve Project
     * @param {string} filter The filter to use
     * @param {function} callback The callback method
     */
    _modelmanager.retrieveProjects = function (filter, callback) {
        connect(_modelmanager.uri).then(function (db) {
            Project.find(filter).then(function(data){
                callback(data);
            })
        });
    }
    return _modelmanager;
};