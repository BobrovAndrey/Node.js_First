/*
*
*  Worker-related tasks
*
*/

//Dependencies 
 let path = require ('path');
 let fs = require('fs');
 let _data = require ('./data');
 let https = require ('https');
 let http = require ('http');
 let helpers = require ('./helpers');
 let url = require ('url');


 //Instantiate the worker object
 let workers = {};


 //Lookup all checks, get their data, send to a validator
  workers.gatherAllChecks = function(){
    //Get all the checks
    _data.list('checks', function (err,checks){
      if(!err && checks && checks.length > 0){
        checks.forEach(function(check){
          //Read in the check data
          _data.read('checks',check,function(err,originalCheckData){
             if(!err && originalCheckData){
              //Pass is to check validator
              workers.validateCheckData(originalCheckData);
             } else {
               console.log ('Error reading one of the checks data');
             }
          });
        });
      } else {
        console.log('Error, could not find any checks to process');
      }
    });
  };
  

  //Sanity-check the check data
  workers.validateCheckData = function(originalCheckData){
    originalCheckData = typeof(originalCheckData) == 'object' && originalCheckData !== null ? originalCheckData : {};
    originalCheckData.id = typeof(originalCheckData.id) == 'string' && originalCheckData.id.trim().length == 20 ? originalCheckData.id.trim() : false;
    originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' && originalCheckData.userPhone.trim().length == 10 ? originalCheckData.userPhone.trim() : false;
    originalCheckData.protocol = typeof(originalCheckData.protocol) == 'string' && ['http', 'https'].indexOf(originalCheckData.protocol) > -1 ? originalCheckData.protocol : false;
    originalCheckData.url = typeof(originalCheckData.url) == 'string' && originalCheckData.url.trim().length > 0 ? originalCheckData.url.trim() : false;
    originalCheckData.method = typeof(originalCheckData.method) == 'string' && ['post', 'get', 'put', 'delete'].indexOf(originalCheckData.method) > -1 ? originalCheckData.method : false;
    originalCheckData.successCodes = typeof(originalCheckData.successCodes) == 'object' && originalCheckData.successCodes instanceof Array && originalCheckData.successCodes.length > 0 ? originalCheckData.successCodes : false;
    originalCheckData.timeOutSeconds = typeof(originalCheckData.timeOutSeconds) == 'number' && originalCheckData.timeOutSeconds % 1 === 0 && originalCheckData.timeOutSeconds >= 1 && originalCheckData.timeOutSeconds <= 5 ? originalCheckData.timeOutSeconds : false;

    //Set the keys that may not be set  
    originalCheckData.state = typeof(originalCheckData.state) == 'string' && ['up', 'down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';
    originalCheckData.lastChecked = typeof(originalCheckData.lastChecked) == 'number' && originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked : false;


    //If all the checks pass, pass the data along to the next step in the process

  };


 // Init script 
 workers.init = function(){
   //Execute all the checks immediately
  workers.gatherAllChecks();



  //Timer to execute this worker-process once per minute
  workers.loop = function(){
    setInterval(function(){
      workers.gatherAllChecks();
    },1000*60)
  };

   //Call the loop so the checks will execute later on
  workers.loop();
 };







 //Export the module
 module.exports = workers;

