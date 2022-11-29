'use strict';
const events = require('events');

//Perform the test
(async function () {

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core WORKFLOW  ASYNC                          =')
    console.log('========================================================================')

    // Lets add some test parameters
    var moduleManager = {}
    moduleManager.uri ='nedb://data' 
    moduleManager.services = {};
    moduleManager.parameters = {};
    moduleManager.common = {};
    moduleManager.events = new events.EventEmitter()
    require('../../../common')(moduleManager);

    // Add the event listener
    moduleManager.events.addListener('event', function (data) {
        console.log('Event: type: ' + data.type + ' message: ' + data.message);
    });

    // intantiate the workflow service
    var workflow = require('..')(moduleManager);
    workflow.createPlan('firstplan', {
        transitions: [
            { name: "playthatsong", from: "on", to: "playing" },
            { name: "turnOff", from: ["playing", "on", "paused"], to: "off" },
            { name: "turnOn", from: "off", to: "on" },
            { name: "pause", from: "playing", to: "paused" }
        ],
        handlers: {}
    }, function (success) {
        console.log('Plan created: ' + success);
        var _projectid = null;
        workflow.createProject('My First Project', 'firstplan', 'off', {}, function (projectid) {
            console.log('01 Project created: ' + projectid);
            _projectid = projectid;
            workflow.retrieveProjectTransitions(_projectid, function (transitions) {
                console.log(transitions);
                workflow.candoProjectTransition(_projectid, 'turnOn', function (cando) {
                    console.log('Can Do: turnOn:' + cando);
                    workflow.doProjectTransition(_projectid, 'turnOn', function (success) {
                        console.log(success);
                        workflow.retrieveProjectTransitions(_projectid, function (transitions) {
                            console.log(transitions);
                            workflow.isProjectState(_projectid, 'on', function (success) {
                                console.log(success);
                                workflow.resetProjectTransition(_projectid, 'off', function (success) {
                                    console.log(success);
                                    workflow.isProjectState(_projectid, 'off', function (success) {
                                        console.log(success);
                                        workflow.retrieveProjectTransitions(_projectid, function (transitions, project) {
                                            console.log(transitions);
                                        });
                                    });
                                });
                            })
                        });
                    })
                })
            })
        })
    })

    /*

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core  WORKFLOW                                =')
    console.log('========================================================================')

    // Lets add some test parameters
    var moduleManager2 = {}
    moduleManager2.services = {};
    moduleManager2.parameters = {};
    moduleManager2._projectid2 = null;

    // intantiate the cache service
    var workflow = require('..')(moduleManager2);
    workflow.createPlan('Second Plan', {
        transitions: [
            { name: "crawl", from: "lie", to: "sit" },
            { name: "walk", from: ["stand"], to: "walking" },
            { name: "run", from: "walking", to: "running" },
            { name: "stand", from: ["running","walking"], to: "paused" }
        ],
        handlers: {}
    }).then(success => console.log('Plan created:' + success));


    workflow.createProject('My Cool Standing Project', 'Second Plan', 'lie', {}).then(projectid => {
        workflow.isProjectState(projectid, 'lie').then(success => console.log('Project state (lie):  ' + success));
        workflow.retrieveProjectTransitions(projectid).then(transitions => console.log(transitions));
        workflow.candoProjectTransition(projectid, 'crawl').then(cando => console.log('Can Do: crawl:' + cando));
        workflow.doProjectTransition(projectid, 'crawl').then(success => console.log(success));
        workflow.retrieveProjectTransitions(projectid).then(transitions => console.log(transitions));
        workflow.isProjectState(projectid, 'crawl').then(success => console.log('Project state (crawl): ' + success));

        console.log('========================================================================')
    });

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core WORKFLOW  Plan                          =')
    console.log('========================================================================')

    var moduleManager = {};
    moduleManager.uri ='nedb://data' 

    var plans = {};
    plans = require('../middleware/core/models/plans')(moduleManager);
    var tranisitions =  [
        { name: "playthatsong", from: "on", to: "playing" },
        { name: "turnOff", from: ["playing", "on", "paused"], to: "off" },
        { name: "turnOn", from: "off", to: "on" },
        { name: "pause", from: "playing", to: "paused" }
    ]
    plans.createPlan('My Cool Plan', tranisitions, function(){
        console.log('saved');

        plans.retrievePlans({}, function(data){
            console.log(data);
        })
    });

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core WORKFLOW  Plan                          =')
    console.log('========================================================================')

    var moduleManager = {};
    moduleManager.uri ='nedb://data' 

    var plans = {};
    plans = require('../middleware/core/models/projects')(moduleManager);
    var tranisitions =  [
        { name: "playthatsong", from: "on", to: "playing" },
        { name: "turnOff", from: ["playing", "on", "paused"], to: "off" },
        { name: "turnOn", from: "off", to: "on" },
        { name: "pause", from: "playing", to: "paused" }
    ]
    plans.createPlan('My Cool Plan', tranisitions, function(){
        console.log('saved');

        plans.retrievePlans({}, function(data){
            console.log(data);
        })
    });

    */

    
})();

