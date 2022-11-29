'use strict';

var events = require('events');


//Perform the test
(function () {

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.dataaccess core implementation                 ')
    console.log('========================================================================')

    // Instantiate the modulemanager
    var moduleManager = {}
    moduleManager.services = {};
    moduleManager.parameters = {};
    moduleManager.events = new events.EventEmitter()
    moduleManager.parameters['datafolder'] = './customdata';
  
    var service = require('..')(moduleManager);
    service.createCollection('mystore', 'somedata', function(){
        service.insert('mystore', 'somedata', { hello: 'world', n: 5, today: new Date(), nedbIsAwesome: true, notthere: null, notToBeSaved: undefined, fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' } }, function (err, data) { 
            console.log(data);
            var data2 = [];
            data2.push({ hello: 'world2', n: 10, today: new Date(), nedbIsAwesome: true, notthere: null, notToBeSaved: undefined, fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' }});
            data2.push({ hello: 'world3', n: 10, today: new Date(), nedbIsAwesome: true, notthere: null, notToBeSaved: undefined, fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' }});
            service.insert('mystore', 'somedata', data2, function (err, newDoc) { 
                console.log(data);
                service.find('mystore', 'somedata', { hello: 'world' }, {}, function (err, docs) {
                    console.log("= filter Hello World");
                    console.log(docs);
            
                    service.find('mystore', 'somedata', { nedbIsAwesome: true }, {}, function (err, docs) {
                        console.log("= filter nedbIsAwesome true");
                        console.log(docs);
            
                        service.update('mystore', 'somedata', { nedbIsAwesome: false }, {}, function (err, docs) {
                            console.log("= filter nedbIsAwesome false");
                            console.log(docs);

                            service.delete('mystore', 'somedata', { nedbIsAwesome: false }, function (err, docs) {
                                console.log("= filter nedbIsAwesome false");
                                console.log(docs);
                            });
                        });
                    });
            
                });
            });
        });
    });

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.dataaccess core implementation  Promise        ')
    console.log('========================================================================')


    var moduleManager = {}
    moduleManager.services = {};
    moduleManager.parameters = {};
    moduleManager.events = new events.EventEmitter()
    moduleManager.parameters['datafolder'] = './customdata';
  
    var service = require('..')(moduleManager);
    service.createCollection('mystore2', 'somedata2').then((data)=> console.log(data.success));


    // Insert the first record
    service.insert('mystore2', 'somedata2', { hello: 'world', n: 5, today: new Date(), nedbIsAwesome: true, notthere: null, notToBeSaved: undefined, fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' } 
    }).then((info)=>console.log(info.data));

   
    // Insert the second record
    var data2 = [];
    data2.push({ hello: 'world2', n: 10, today: new Date(), nedbIsAwesome: true, notthere: null, notToBeSaved: undefined, fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' }});
    data2.push({ hello: 'world3', n: 10, today: new Date(), nedbIsAwesome: true, notthere: null, notToBeSaved: undefined, fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' }});
    service.insert('mystore2', 'somedata2', data2).then(info=> console.log(info.data));

    // Find some data
    service.find('mystore2', 'somedata2', { hello: 'world' }, {}).then(info=>console.log(info));
    service.find('mystore2', 'somedata2', { nedbIsAwesome: true }, {}).then(info=>console.log(info));  
    service.delete('mystore2', 'somedata2', { nedbIsAwesome: false }).then(info=>console.log(info));  
    
    console.log('========================================================================')

})();

