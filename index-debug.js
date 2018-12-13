/*
 * Primary file for the API
 */

 //Dependencies

const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');
let exampleDebuggingProblem = require('./lib/exampleDebuggingProblem');

//Declare the app
let app = {};

//Init function
app.init = function(){
  //Start the server
  debugger;
  server.init();
  debugger;

//Start the workers
  debugger;
  workers.init();
  debugger;

//Start the CLI, but make sure that it starts last
setTimeout(function(){
  cli.init();
  debugger;
},50);
  debugger;
//Set foo = 1
debugger;
let foo = 1;
console.log('Just Assinged 1 to FOO');
debugger;

//Increment foo
foo++;
console.log('Just incremented foo');
debugger;

//Square foo
foo *= foo;
console.log('Just squared foo');
debugger;

//Convert foo to a string
  foo = foo.toString();
  console.log('Just onverted foo');
  debugger;
  
//Call the init script that will throw
exampleDebuggingProblem.init();
console.log('just called the library');
debugger;

};

//Execute 
app.init();

//Export the app
module.exports = app;