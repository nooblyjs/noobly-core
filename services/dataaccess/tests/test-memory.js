'use strict';

//Perform the test
(function () {

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.dataaccess core implementation                 ')
    console.log('========================================================================')

    var parameters ={};
    var service = require('../controllers/controller-memory')(parameters); 
    service.createCollection('mystore','somedata');

    service.insert('mystore','somedata', {hello: 'world', n: 5, today: new Date(), nedbIsAwesome: true, notthere: null , notToBeSaved: undefined , fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' }}, function (err, newDoc) { });
    
    var data2 =[]
    data2.push({hello: 'world2', n: 10, today: new Date(), nedbIsAwesome: true, notthere: null , notToBeSaved: undefined , fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' }});
    data2.push({hello: 'world3', n: 10, today: new Date(), nedbIsAwesome: true, notthere: null , notToBeSaved: undefined , fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' }});
    service.insert('mystore','somedata', data2, function (err, newDoc) { });

    service.find('mystore','somedata', {hello:'world'}, {}, function (err, docs) {
        console.log("= filter Hello World");
        console.log(docs);

        service.find('mystore','somedata',{nedbIsAwesome: true}, {}, function (err, docs) {
            console.log("= filter nedbIsAwesome true");
            console.log(docs);

            service.update('mystore','somedata',{nedbIsAwesome: false},{}, function (err, docs) {
                console.log("= filter nedbIsAwesome false");
                console.log(docs);
            });
        });
    
    });


})();

