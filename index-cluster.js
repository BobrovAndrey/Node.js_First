/*
 * Primary file for the API
 */

 //Dependencies

const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');
const cluster = require('cluster');
const os = require ('os');


//Declare the app
let app = {};

//Init function
app.init = function(callback){

  //If we on the master thread, start the background and CLI
  if(cluster.isMaster){

    //Start the workers
    workers.init();

    //Start the CLI, but make sure that it starts last
    setTimeout(function(){
      cli.init();
    },50);

    //Fork the process
    for ( let i = 0; i < os.cpus().length; i++){
      cluster.fork();
    }
    
  } else {

//IF we`re not an the master thread, Start the HTTP server
server.init();
  }
};

//Execute 
app.init();

//Export the app
module.exports = app;