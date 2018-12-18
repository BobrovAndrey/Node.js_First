/*
* This is an example TCP (net) Server
*Listens to the port 6000 and sends the word "pong" to client
 */ 

 //Dependencies
 let net = require('net');

 //Create the srver
 let server = net.createServer(function(connection){
  //Send the word "PONG"
  let outboundMessage = 'pong';
  connection.write(outboundMessage);

  //When the client writes something we need log it out
  connection.on('data',function(inboundMessage){
    let messageString = inboundMessage.toString();
    console.log("I wrote "+outboundMessage+" and they said "+messageString);
    // console.log(`i wrote ${ outboundMessage}` + ` and they said ${messageString}`);
  })

 });

 server.listen(6000);
