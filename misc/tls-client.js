/*
*
* Example TLS client 
* Connect to port 6000 and sends the word 'ping' to server
*
*/

//Dependencies
let tls = require('tls');
let fs = require('fs');
let path = require('path');

//Server options
let options = {
  'ca': fs.readFileSync(path.join(__dirname,'/../https/cert.pem')) // Obly required becouse we are used self-singed sertificate
 };



//Define the message 
let outboundMessage = 'ping';

//Create the client
let  client = tls.connect(6000,options , function(){
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
