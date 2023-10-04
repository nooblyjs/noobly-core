var connect = require('../../../../../common/dataaccess').connect;
var Document = require('../../../../../common/dataaccess').Document;
var EmbeddedDocument = require('../../../../../common/dataaccess').EmbeddedDocument;

/**
 * Manage the models
 * 
 * @param serviceManager
 */
module.exports = function (serviceManager) {

    var _modelmanager = {};
    _modelmanager.uri = serviceManager.uri;

    class Transition extends EmbeddedDocument {
        constructor() {
            super();

            this.name = {
                type: String,
                default: ''
            };

            this.from = {
                type: String,
                default: ''
            };

            this.to = {
                type: String,
                default: ''
            };
        }
    }

    /**  
     * The plan object
    */
    class Plan extends Document {
        constructor() {
            super();

            this.name = {
                type: String,
                default: ''
            };

            this.transitions = [Transition]
        }
    }

    /**
     * Method : Create a plan
     * Create a plan and save it to the database
     * @param {string} name The plan name
     * @param {array} transitions The plan transitions
     * @param {function} callback The callback method
     */
    _modelmanager.createPlan = function (name, plan, callback) {
        connect(_modelmanager.uri).then(function (db) {
            Plan.findOneAndDelete({ name: name }).then(function () {
                var _plan = Plan.create();
                _plan.name = name;
                for (var i = 0; i < plan.transitions.length; i++) {
                    _plan.transitions.push(new Transition())
                    _plan.transitions[i].name = plan.transitions[i].name;
                    _plan.transitions[i].from = plan.transitions[i].from;
                    _plan.transitions[i].to = plan.transitions[i].to;
                }
                _plan.save().then(callback(_plan));
            });
        });
    }

    /**
     * Retrieve Plans
     * @param {string} filter The filter to use
     * @param {function} callback The callback method
     */
    _modelmanager.retrievePlans = function (filter, callback) {
        connect(_modelmanager.uri).then(function (db) {
            Plan.findOne(filter).then(function (data) {
                callback(data);
            })
        });
    }

    return _modelmanager;
};