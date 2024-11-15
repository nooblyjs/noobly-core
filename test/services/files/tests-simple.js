'use strict';

(function () {

    // Instantiate the noobly Framework
    var noobly = require('../../..')();
    var service = noobly.core.services.files;

    // Async method for doing file operations
    service.create('testfile.txt', 'Some File data', function (data) {
        service.append('testfile.txt', 'Some more data', function (data) {
            service.rename('testfile.txt', 'new text file.txt', function (data) {
                service.exists('new text file.txt', function (data) {
                    service.readFile('new text file.txt', function (err, data) {
                        console.log(data.toString())
                        service.readDirectory('./', function (err,data) {
                            console.log(data)
                            service.delete('new text file.txt', function (data) {
                                console.log(err, data)
                            });
                        });
                    });  
                });
            });
        });
    });
 
    // Syncronous actions for doing file operations
    service.create('testfile 2.txt', 'Some File data').then((status)=>{console.log(status)})
    service.append('testfile 2.txt', 'Some more data').then((status)=>{console.log(status)})
    service.rename('testfile 2.txt','new testfile 2.txt').then((status)=>{console.log(status)})


})();

