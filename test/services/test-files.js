'use strict';
const events = require('events');

(function () {

    console.log('========================================================================')
    console.log('=  TESTING nooblyjs.core file service : Base Implementation (core)=')
    console.log('========================================================================')

    // Instantiate the modulemanager
    var moduleManager = {};
    moduleManager.core = {};
    moduleManager.core.services = {};
    moduleManager.parameters = { 'basefolder': './data/' };
    moduleManager.core.common = {};
    moduleManager.events = new events.EventEmitter()

    // Load the common utilities
    require('../../common')(moduleManager);

    moduleManager.events = new events.EventEmitter()
    moduleManager.events.addListener('event', function (data) {
        console.log('Event: type: ' + data.type + ' message: ' + data.message)
    });

    var service = require('../../services/files')(moduleManager);
    service.create('testfile.txt', 'Some File data', function (data) {
        console.log(data)
        service.append('testfile.txt', 'Some more data', function (data) {
            service.rename('testfile.txt', 'new text file.txt', function (data) {
                console.log(data)
                service.exists('new text file.txt', function (data) {
                    console.log(data)
                    service.readFile('new text file.txt', function (data) {
                        console.log(data)
                        service.readDirectory('../', function (data) {
                            console.log(data)
                            service.delete('new text file.txt', function (data) {
                                console.log(data)
                            }
                            );
                        });
                    });
                });

            });
            console.log(data)
        });
    });


})();

