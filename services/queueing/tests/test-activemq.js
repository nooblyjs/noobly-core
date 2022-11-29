'use strict';
const strictEqual = require('assert/strict'); 

//Perform the test
(function() {
    
    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core queueing service activemq                =')
    console.log('========================================================================')
    
    // Lets add some test parameters
    var parameters = {'host': '127.0.0.1','port' : 61616};

    // intantiate the queue service
    var queueing = require('..')(require('../controllers/provider-activemq'), parameters); 
    queueing.events.addListener('queue-enqueue', function(data){
        console.log('EVENT RAISED :  Item enqueued to ' + data)
    });
    queueing.events.addListener('queue-dequeue', function(data){
        console.log('EVENT RAISED :  Item dequeued to ' + data)
    });
    
    var queueitem = 'This is test item';
    queueing.enqueue('test queue', queueitem);
    queueing.dequeue('test queue', function(data){
        try {
            strictEqual(queueitem, data);  
            console.log("enqueue and dequeue tested");
        } catch (err) {
          console.log(err.message);
        }      
    });

    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core topic service                            =')
    console.log('========================================================================')

    queueing.events.addListener('topic-subscribe', function(data){
        console.log('EVENT RAISED : topic subscibed ' + data)
    });
    queueing.events.addListener('topic-send', function(data){
        console.log('EVENT RAISED : topic sent ' + data)
    });
    queueing.events.addListener('topic-recieve', function(data){
        console.log('EVENT RAISED : topic recieved  ' + data)
    });
    

    var topicitem = 'This is topic item';
    queueing.subscribe('test topic','subscriber 1');
    queueing.subscribe('test topic','subscriber 2');
    
    queueing.send('test topic', topicitem);
    queueing.recieve('test topic', 'subscriber 1',  function(data){
        try {
            strictEqual(topicitem, data);  
            console.log("subscribe, send and receive tested");
        } catch (err) {
            console.log(err.message);
        }  
    });
    queueing.recieve('test topic', 'subscriber 2',  function(data){
        try {
            strictEqual(topicitem, data);  
            console.log("subscribe, send and receive tested");
        } catch (err) {
            console.log(err.message);
        }  
    })

    console.log('========================================================================')

})();

