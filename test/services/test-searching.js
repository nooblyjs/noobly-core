'use strict';

const events = require('events');


//Perform the test
(function () {

    console.log('========================================================================')
    console.log('=  TESTING noobsjs searching service                         =')
    console.log('========================================================================')

    var moduleManager = {}
    moduleManager.core.services = {};
    moduleManager.parameters = {};
    moduleManager.events = new events.EventEmitter()

    var service = require('..')(moduleManager);
    moduleManager.events.addListener('event', function (data) {
        console.log('Event: type: ' + data.type + ' message: ' + data.message);
    })


    const persons = [
        {
            height: 180,
            name: 'John Morton',
        },
        {
            height: 175,
            name: 'David Barker',
        },
        {
            height: 170,
            name: 'Thomas Castro',
        },
    ];

    /**
     * The following test add data and then returns a search result
     */
    service.updateIndex('testindex', persons, function (success) {
        /*
        service.searchIndex('testindex', 'height:>170', function (data) {
            console.log(data);

            service.searchIndex('mydata', 'height:>170', function (data) {
                console.log(data);
            })
        })
        */
    })

    console.log('========================================================================')

})();

