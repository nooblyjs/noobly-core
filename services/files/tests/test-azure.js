'use strict';
const strictEqual = require('assert/strict'); 

//Perform the test
(function() {
    
    console.log('========================================================================')
    console.log('=  TESTING noobsjs.core file service : Azure Implentation          =')
    console.log('========================================================================')
    
    // Lets add some test parameters
    var parameters = {'connectionstring': 'DefaultEndpointsProtocol=https;AccountName=noobsjsdevelopment;AccountKey=sX9cY3lZEsz9FGALyTBBPKf1qq3TIs2YEXo5lkn56c3AOiy089rnoW6nKGyQi0BZXz1GrkPj7wif+AStXECGZA==;EndpointSuffix=core.windows.net', 
    'container':'noobsjsfiles'};

    // Instantiate the instance of the file service
    var service = require('..')(require('../controllers/provider-azure'), parameters); 
    service.events.addListener('files-create', function(data){
        console.log('EVENT RAISED :  File created ' + data)
    });
    service.events.addListener('files-append', function(data){
        console.log('EVENT RAISED :  File appended ' + data)
    });
    service.events.addListener('files-rename', function(data){
        console.log('EVENT RAISED :  File renamed ' + data)
    });
    service.events.addListener('files-exists', function(data){
        console.log('EVENT RAISED :  File exists ' + data)
    });
    service.events.addListener('files-exists', function(data){
        console.log('EVENT RAISED :  File exists ' + data)
    });
    service.events.addListener('files-read', function(data){
        console.log('EVENT RAISED :  File Read ' + data)
    });
    service.events.addListener('files-readdirectory', function(data){
        console.log('EVENT RAISED :  File Read Directory ' + data)
    });
    service.events.addListener('files-delete', function(data){
        console.log('EVENT RAISED :  File Delete ' + data)
    });

    service.create('testfile.txt','Some File date', function(err,data){ 
        service.append('testfile.txt','Some more data', function(err, data){ 
            service.rename('testfile.txt','new text file.txt', function(err, data){
                service.exists('new text file.txt', function(exists, error){
                    service.readFile('new text file.txt', function(data){
                        console.log("Data Read from file" + data)
                        service.readDirectory('../', function(data){
                            console.log(data);
                            service.delete('new text file.txt', function(data){ "Error " + console.log(data)} );
                        })
                    });
                })
            });
        });
   } );

    console.log('========================================================================')

})();
