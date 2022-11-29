'use strict';

//Perform the test
(function () {

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.dataaccess mongodb implementation                 ')
    console.log('========================================================================')

    var parameters ={};
    parameters['url']= 'mongodb://localhost:27017/myproject';
    parameters['provider'] = require('../controllers/provider-mongodb');
    var service = require('..')(parameters); 
    service.createCollection('mystore','somedata');

    var data =[]
    data.push({hello: 'world', n: 5, today: new Date(), nedbIsAwesome: true, notthere: null , notToBeSaved: undefined , fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' }});
    data.push({hello: 'world2', n: 10, today: new Date(), nedbIsAwesome: true, notthere: null , notToBeSaved: undefined , fruits: ['apple', 'orange', 'pear'], infos: { name: 'nedb' }});
    service.insert('mystore','somedata', data, function (err, newDoc) { });

   
    service.find('mystore','somedata', {hello:'world'}, {}, function (err, docs) {
        console.log(docs);
    });

    service.find('mystore','somedata',{hello: 'world'}, {}, function (err, docs) {
        console.log(docs);
    });

    service.update('mystore','somedata',{hello: 'world'},{hello: 'world3'}, function (err, docs) {
        console.log(docs);
    });

    console.log('========================================================================')

})();

