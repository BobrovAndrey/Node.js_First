/*
* This is an example TLS Server
*Listens to the port 6000 and sends the word "pong" to client
 */ 

 //Dependencies
 let tls = require('tls');
 let fs = require('fs');
 let path = require('path');

 //Server options
 let options = {
  'key' : fs.readFileSync(path.join(__dirname,'/../https/key.pem',)),
  'cert': fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
 };

 //Create the srver
 let server = tls.createServer(options, function(connection){
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
