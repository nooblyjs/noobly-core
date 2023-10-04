'use strict';
const StateMachine = require('./statemachine');
const { StateMachineError, errorCodes } = require('./statemachine/errors');
const { randomUUID } = require('crypto');

/**
 * The Wrkflow (Statemaching) Controller
 * This controller uses the nodejs statemaching obhect
 * @param serviceManager The parent class that contains the parameters
 */
module.exports = function (serviceManager) {

    // The controller
    var _controller = {};
    _controller.plans = {};
    _controller.projects = {};

    // Load the configuration controller
    var _configurationManager = serviceManager.core.services.configuration;

    // Create the models
    const plans = require('./models/plans')(serviceManager);
    const projects = require('./models/projects')(serviceManager);

    /**
     * Create a plan async
     * @param {string} plan : The name of the plan
     * @param {object} config : The configuration of the plan
     * @param {function} callback : function(success){ console.log } //true 
     */
    _controller.createPlan = function (plan, config, callback) {
        _controller.plans[plan] = { 'config': config };
        plans.createPlan(plan,config, function(data){
            callback(true, _controller.plans[plan]);
        })
    }

    /**
     * Create a project for a plan async
     * @param {string} projectname : The unique name of the project
     * @param {string} plan : The name of the plan
     * @param {string} initalistate : The state we are starting on
     * @param {object} parameters : The parameters of the project
     * @parm {function} callback : The callback method
     */
    _controller.createProject = function (projectname, plan, initalState, parameters, callback) {
        var projectid = randomUUID();
        _controller.projects[projectid] = { 'project': projectid, 'projectname': projectname, 'parameters': parameters, 'instance': new StateMachine(initalState, _controller.plans[plan].config) }
        callback(projectid, _controller.projects[projectid]);
    }

    /**
     * Retrieve transisitons 
     * @param {string} projectid : The unique id of the project
     * @parm {function} callback : The callback method
     */
    _controller.retrieveProjectTransitions = function (projectid, callback) {
        callback(_controller.projects[projectid].instance.availableTransitions(), _controller.projects[projectid]);
    }

    /**
     * Can do Project Transition
     * @param {string} projectid : The unique id of the project
     * @param {string} transistion : The name of the transition
     * @parm {function} callback : The callback method
     */
    _controller.candoProjectTransition = function (projectid, transition, callback) {
        callback(_controller.projects[projectid].instance.can(transition), _controller.projects[projectid]);
    }

    /**
     * Is the project in a state
     * @param {string} projectid : The unique id of the project
     * @param {string} state : The name of the state
     * @parm {function} callback : The callback method
     */
    _controller.isProjectState = function (projectid, state, callback) {
        callback(_controller.projects[projectid].instance.is(state), _controller.projects[projectid]);
    }

    /**
     * Do Project Transition
     * @param {string} projectid : The unique id of the project
     * @param {string} transistion : The name of the transition
     * @parm {function} callback : The callback method
     */
    _controller.doProjectTransition = async function (projectid, transition, callback) {
        await _controller.projects[projectid].instance[transition]();
        callback(true, _controller.projects[projectid]);
    }

    /**
     * Reset Project Transition
     * @param {string} projectid : The unique id of the project
     * @param {string} transistion : The name of the transition
     * @parm {function} callback : The callback method
     */
    _controller.resetProjectTransition = async function (projectid, transition, callback) {
        await _controller.projects[projectid].instance.reset(transition);
        callback(true, _controller.projects[projectid]);
    }

    return _controller;
}