/*
* 
* Server-related tasks
*
*/

 // Dependencies
 const http = require ('http');
 const https = require ('https');
 const url = require ('url');
 const StringDecoder = require('string_decoder').StringDecoder;
 const config = require('.config');
 const fs = require ('fs');
 const handlers  = require ('.handlers');
 const helpers = require ('.helpers');
 const path = require('path');


 //Instantiate the server

//  //@TODO GET RID OF THIS
//  helpers.sendTwilioSms('4157375309','HELLO!', function(err){
//    console.log('This was the error: ', err);
//  });

//  //TESTING
//  //@TODO delete this
 const _data = require ('./lib/data');

//  //TESTING
//  //@TODO delete this
//  _data.delete('test','newFile', function(err){
//   console.log('this was the error', err);
//  });


//Instantiate the HTTP server
let httpServer = http.createServer(function(req, res){
  undefinedServer(req,res);
});

//Start the HTTP server
httpServer.listen(config.httpPort,function(){
  console.log(`The server is listening on port ${config.httpPort}`);
  // console.log("The server is up and running on port '+config.httpPort+'");
});

//Instantiate the HTTPS server
let httpsServerOptions = {
  'key' : fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};

let httpsServer = https.createServer(httpsServerOptions,function(req, res){
  undefinedServer(req,res);
});

//Start the HTTPS server
httpsServer.listen(config.httpsPort,function(){
  console.log('The HTTPS server is listening on port' +  ` ${config.httpsPort}`);
});

//All the server logic for both the http and https server
let undefinedServer = function (req, res){
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  //Get the path 
  const path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  //get the querystring as an object

  let queryStringObject = parsedUrl.query;

  // var queryStringObject = parsedUrl.query;
  

  //Get the HTTP Method
  let method = req.method.toLowerCase();

  //Get the headers as an object
  var headers = req.headers;

  //Get the payload, if any
  let decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(data){
    buffer += decoder.write(data);
  });
  req.on('end', function(){
    buffer += decoder.end();

    //Choose the handler this request should go to.
    let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;


    //Construct the data object to send to the handler
    let data = {
     'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buffer) 
    };

    //Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload){

      // Use the status code called back by the handler,or default o 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handlers, pr default to an empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to a string
      let payloadString = JSON.stringify(payload);

      //Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      //Log the request path
      console.log ('Returning this response:', statusCode, payloadString);
    });
  });
};



//Define a request router
let router = {
  'ping': handlers.ping,
  'users': handlers.users,
  'tokens': handlers.tokens,
  'checks' : handlers.checks
};
