/*
*
* Example TCP client 
* Connect to port 6000 and sends the word 'ping' to server
*
*/

//Dependencies
let net = require('net');

//Define the message 
let outboundMessage = 'ping';

//Create the client
let  client = net.createConnection({ port : 6000}, function(){
  //send th message
  client.write(outboundMessage);

});

//When the server writes back, log what is says and then kill the client
client.on('data',function(inboundMessage){
  let messageString = inboundMessage.toString();
  console.log("I wrote "+outboundMessage+" and they said "+messageString);
  // console.log(`i wrote ${ outboundMessage}` + ` and they said ${messageString}`);
  client.end();
});
