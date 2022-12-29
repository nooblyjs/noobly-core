'use strict';
const strictEqual = require('assert/strict'); 

//Perform the test
(function() {
    
    console.log('========================================================================')
    console.log('=  TESTING nooblyjs.core queueing service                         =')
    console.log('========================================================================')
    
    // intantiate the queue service
    var queueing = require('../services/queueing')(); 
    queueing.events.addListener('queue-enqueue', function(queue){
        console.log('EVENT RAISED :  Item enqueued to "' + queue + '"')
    });
    queueing.events.addListener('queue-dequeue', function(queue){
        console.log('EVENT RAISED :  Item dequeued from "' + queue + '"')
    });
    
    var queueitem = 'This is test item';
    queueing.enqueue('test queue', queueitem);
    queueing.dequeueAsync('test queue', function(data){
        try {
            strictEqual(queueitem, data);  
            console.log('01. Item Async Dequeued value from "test queue" value: ' + data)
        } catch (err) {
          console.log(err.message);
        }      
    });

    var queueitem = 'This is test item 2';
    queueing.enqueue('test queue 2', queueitem);
    queueing.dequeue('test queue 2').then(data => console.log('02. Item Dequeued value from "test queue" value: ' + data))

    console.log('========================================================================')
    console.log('=  TESTING nooblyjs.core topic service                            =')
    console.log('========================================================================')

    queueing.events.addListener('topic-subscribe', function(topic){
        console.log('EVENT RAISED : topic subscribed for "' + topic.topic + '"' + ' by "' + topic.subscriber + '"')
    });
    queueing.events.addListener('topic-send', function(topic){
        console.log('EVENT RAISED : topic sent "' + topic.topic + '"')
    });
    queueing.events.addListener('topic-recieve', function(topic){
        console.log('EVENT RAISED : topic recieved  for "' + topic.topic + '"' + ' by "' + topic.subscriber + '"')
    });
    
    var topicitem = 'This is topic item';
    queueing.subscribe('test topic','subscriber 1');
    queueing.subscribe('test topic','subscriber 2');
    
    queueing.send('test topic', topicitem);
    queueing.receiveAsync('test topic', 'subscriber 1',  function(data){
        try {
            strictEqual(topicitem, data);  
            console.log("01. Item Async Recieve (subscriber 1): " + data)
        } catch (err) {
            console.log(err.message);
        }  
    });
    queueing.receiveAsync('test topic', 'subscriber 2',  function(data){
        try {
            strictEqual(topicitem, data);  
            console.log("01. Item Async Recieve (subscriber 2): " + data)
        } catch (err) {
            console.log(err.message);
        }  
    });

    var topicitem = 'This is topic item 2';
    queueing.subscribe('test topic 2','subscriber 3');
    queueing.subscribe('test topic 2','subscriber 4');
    
    queueing.send('test topic 2', topicitem);
    queueing.receive('test topic 2','subscriber 3').then(data => "02. Item Recieve (subscriber 3): " + data)
    queueing.receive('test topic 2','subscriber 4').then(data => "02. Item Recieve (subscriber 4): " + data)

})();

