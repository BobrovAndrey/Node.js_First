/*
* 
*/

//Dependeencies
let http2 = require('http2');

//Create client
let client = http2.connect('http://localhost:6000');

//Create a request
let req = client.request({
  ':path' : '/'
});

//When a message is received, add the pieces of it together until you reach the end
let str = '';
req.on('data', function(chunk){
  str+=chunk;
});

//When the message end, log it out
req.on('end', function(){
  console.log(str);
});

//End the request
req.end();
