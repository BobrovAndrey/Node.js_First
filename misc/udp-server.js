/*
* Example UDP Server
*Creating UDP datagram server listening on 6000
*/

//Dependencies
let dgram = require('dgram');

//Create a server
let server = dgram.createSocket('udp4');

server.on('message', function(messageBuffer,sender){
  //Do something with an incoming message or do something with sender
  let messageString = messageBuffer.toString();
  console.log(messageString);

});

//Bind to 6000
server.bind(6000);
