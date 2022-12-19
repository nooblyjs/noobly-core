'use strict';
const events = require('events');

(function () {

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core file service : Base Implementation (core)=')
    console.log('========================================================================')

    // Instantiate the modulemanager
    var moduleManager = {};
    moduleManager.core = {};
    moduleManager.core.services = {};
    moduleManager.parameters = {};
    moduleManager.core.common = {};
    moduleManager.events = new events.EventEmitter()
    require('../../common')(moduleManager);
    var parameters = { 'basefolder': './data/' };

    var service = require('../../services/files')(parameters);
    service.events.addListener('files-create', function (data) {
        console.log('EVENT RAISED :  File created ' + data)
    });
    service.events.addListener('files-append', function (data) {
        console.log('EVENT RAISED :  File appended ' + data)
    });
    service.events.addListener('files-rename', function (data) {
        console.log('EVENT RAISED :  File renamed ' + data)
    });
    service.events.addListener('files-exists', function (data) {
        console.log('EVENT RAISED :  File exists ' + data)
    });
    service.events.addListener('files-exists', function (data) {
        console.log('EVENT RAISED :  File exists ' + data)
    });
    service.events.addListener('files-read', function (data) {
        console.log('EVENT RAISED :  File Read ' + data)
    });
    service.events.addListener('files-readdirectory', function (data) {
        console.log('EVENT RAISED :  File Read Directory ' + data)
    });
    service.events.addListener('files-delete', function (data) {
        console.log('EVENT RAISED :  File Delete ' + data)
    });

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

