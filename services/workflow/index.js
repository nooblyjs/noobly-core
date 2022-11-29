/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @package
 */
'use strict';
const middlewareUtility = require('../../common/middleware');

/**
 * Module : Workflow Manager
 * The workflow manager object exposes various state management or workflow functionality to the platform
 * The middleware that can be used is as follows :
 *  - core : The core middleware uses bespoke built state management functionality 
 * @params moduleManager : The calling module 
 * @events The following events are raised by this module
 *  - plan-create : When a plan is created
 *  - project-create : When a project is created
 *  - transitions-retrieve : Retrieve the transitions
 *  - transitions-can : Determine if a transition can be done
 *  - state-is : Determine if the project is in a certain state
 *  - transitions-do: Do a transition
 *  - transitions-reset: Reset a transition to asate
*/
module.exports = function (moduleManager) {

    // Initiate the object 
    var _serviceManager = {};

    // Initialise the middleware container
    _serviceManager.middleware = [];

    // Load the configuration controller
    var configuration = moduleManager.core.services.configuration;

    /**
     * Method : RaiseEvent
     * Note that there may be multiple event middleware's to fire
     * @param {string} name : The name of the even being fired
     * @param {object} options : An object holding the specific parameters
    */
    _serviceManager.raiseEvent = function (name, options) {
        moduleManager.core.common.middleware.retrieve(_serviceManager, 'raiseEvent').forEach(function (item, index) {
            item.raiseEvent(name, options);
        });
    }

    /**
     * Create a plan async
     * @param {string} plan : The name of the plan
     * @param {object} config : The configuration of the plan
     * @param {function} callback : The callback method
     */
    _serviceManager.createPlan = function (plan, config, callback) {
        _serviceManager.raiseEvent('event', { type: 'plan-create', message: 'plan created: ' + plan, options: { plan } });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').createPlan(plan, config, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').createPlan(plan, config, function (has) {
                        resolve(has);
                    })
                });
        }
    }

    /**
     * Create a project for a plan
     * @param {string} project : The unique name of the project
     * @param {string} plan : The name of the plan
     * @param {string} initalState : The transition that the plan starts on
     * @param {object} parameters : The parameters of the project
     * @param {function} callback : The callback method
     */
    _serviceManager.createProject = function (project, plan, initalState, parameters, callback) {
        _serviceManager.raiseEvent('event', { type: 'project-create', message: 'project : ' + project + ' created', options: { project, plan, initalState } });
        if (callback) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').createProject(project, plan, initalState, parameters, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').createProject(project, plan, initalState, parameters, function (projectid) {
                        resolve(projectid);
                    })
                });
        }
    }

    /**
     * Retrieve transisitons
     * @param {string} project : The unique name of the project
     * @parm {function} callback : The callback method
     */
    _serviceManager.retrieveProjectTransitions = function (project, callback) {
        _serviceManager.raiseEvent('event', { type: 'transitions-retrieve', message: 'project: ' + project + ' retrieve transistions', options: { project } });
        if (callback) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').retrieveProjectTransitions(project, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').retrieveProjectTransitions(project, function (has) {
                        resolve(has);
                    })
                });
        }
    }

    /**
     * Can do Project Transition Async
     * @param {string} project : The unique name of the project
     * @param {string} transistion : The name of the transition
     * @param {function} callback : The callback method
     */
    _serviceManager.candoProjectTransition = function (project, transition, callback) {
        _serviceManager.raiseEvent('event', { type: 'transitions-can', message: 'project: ' + project + ' transition can: ' + transition, project, transition });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').candoProjectTransition(project, transition, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').candoProjectTransition(project, transition, function (has) {
                        resolve(has);
                    })
                });
        }
    }

    /**
     * Do Project Transition Async
     * @param {string} project : The unique name of the project
     * @param {string} state : The name of the transition
     * @parm {function} callback : The callback method
     */
    _serviceManager.isProjectState = function (project, state, callback) {
        _serviceManager.raiseEvent('event', { type: 'state-is', message: 'project: ' + project + ' state is : ' + state, project, state });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').isProjectState(project, state, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').isProjectState(project, state, function (has) {
                        resolve(has);
                    })
                });
        }
    }

    /**
     * Do Project Transition Async
     * @param {string} project : The unique name of the project
     * @param {string} transistion : The name of the transition
     * @parm {function} callback : The callback method
     */
    _serviceManager.doProjectTransition = function (project, transition, callback) {
        _serviceManager.raiseEvent('event', { type: 'transitions-do', message: 'project: ' + project + ' do transition : ' + transition, project, transition });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').doProjectTransition(project, transition, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').doProjectTransition(project, transition, function (has) {
                        resolve(has);
                    })
                });
        }
    }

    /**
     * Method resetProjectTransition Reset a Project Transition
     * @param {string} project : The unique name of the project
     * @param {string} transistion : The name of the transition
     * @parm {function} callback : The callback method
     */
    _serviceManager.resetProjectTransition = function (project, transition, callback) {
        _serviceManager.raiseEvent('event', { type: 'transitions-reset', message: 'project: ' + project + ' do reset : ' + transition, project, transition });
        if (callback != null) {
            moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').resetProjectTransition(project, transition, callback)
        } else {
            return new Promise(
                (resolve, reject) => {
                    moduleManager.core.common.middleware.retrieveFirst(_serviceManager, 'createPlan').resetProjectTransition(project, transition, function (has) {
                        resolve(has);
                    })
                });
        }
    }

    /**
    * Initialise the module
    */
    _serviceManager.initialise = function () {

        // Use the default middleware
        moduleManager.core.common.middleware.use(_serviceManager, configuration != null && configuration.has('core.workflow.contoller') ? require(configuration.get('core.workflow.contoller')) : require('./middleware/core')(moduleManager))

        // Use the default event manager
        moduleManager.core.common.middleware.use(_serviceManager, require('../../common/middleware/events-middleware/events')(moduleManager));

        // Load the model manager
        _serviceManager.modelManager = require('./models')(moduleManager)

        // Load the route manager
        _serviceManager.routeManager = require('./routes')(moduleManager)

        // Load the views manager
        _serviceManager.routeManager = require('./views')(moduleManager)

    }();

    return _serviceManager;
};

