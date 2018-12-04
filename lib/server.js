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
 const config = require('./config');
 const fs = require ('fs');
 const handlers  = require ('./handlers');
 const helpers = require ('./helpers');
 const path = require('path');
 let util = require('util');
 let debug = util.debuglog('server');


 //Instantiate the server

 const server = {};

//  //@TODO GET RID OF THIS
//  helpers.sendTwilioSms('4157375309','HELLO!', function(err){
//    console.log('This was the error: ', err);
//  });

//  //TESTING
//  //@TODO delete this
//  const _data = require ('./lib/data');

//  //TESTING
//  //@TODO delete this
//  _data.delete('test','newFile', function(err){
//   console.log('this was the error', err);
//  });


//Instantiate the HTTP server
server.httpServer = http.createServer(function(req, res){
  server.undefinedServer(req,res);
});


//Instantiate the HTTPS server
server.httpsServerOptions = {
  'key' : fs.readFileSync(path.join(__dirname,'/../https/key.pem',)),
  'cert': fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
};

server.httpsServer = https.createServer(server.httpsServerOptions,function(req, res){
  server.undefinedServer(req,res);
});


//All the server logic for both the http and https server
server.undefinedServer = function (req, res){
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
    let chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;


    //Construct the data object to send to the handler
    let data = {
     'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buffer) 
    };

    //Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload,contentType){
      //Determine the type of responce (fallback to JSON)
      contentType = typeof(contentType) == 'string' ? contentType : 'json';

      // Use the status code called back by the handler,or default o 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

  

      //Return the response pats that are content-specific 
      let payloadString = '';
      if(contentType == 'json'){
        res.setHeader('Content-Type', 'application/json');
        // Use the payload called back by the handlers, pr default to an empty object
        payload = typeof(payload) == 'object'? payload : {};
        payloadString = JSON.stringify(payload);
      }
      if(contentType == 'html'){
        res.setHeader('Content-Type', 'text/html');
        payloadString = typeof(payload) == 'string' ? payload : '';
      }

      //Return the responce that are common to all content-types
      res.writeHead(statusCode);
      res.end(payloadString);


      //Log the request path
      // If he response is 200 otherwise print red
      if(statusCode == 200){
        debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
        // debug('Returning this response:', statusCode, payloadString);
      } else {
        debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      }
      
    });
  });
};



// //Define a request router (JSON)
// server.router = {
//   'ping': handlers.ping,
//   'users': handlers.users,
//   'tokens': handlers.tokens,
//   'checks' : handlers.checks
// };

//Define a request router
server.router = {
  '' : handlers.index,
  'account/create' : handlers.accountCreate,
  'account/edit' : handlers.accountEdit,
  'account/deleted' : handlers.accountDeleted,
  'session/create' : handlers.sessionCreate,
  'session/deleted' : handlers.sessionDeleted,
  'checks/all' : handlers.checkList,
  'checks/create' : handlers.checksCreate,
  'checks/edit' : handlers.checksEdit,
  'ping': handlers.ping,
  'api/users': handlers.users,
  'api/tokens': handlers.tokens,
  'api/checks' : handlers.checks,
  'favicon.ico': handlers.favicon,
  'public' : handlers.public
 };

// Init the server 
server.init = function(){
  //Start the HTTP server
  server.httpServer.listen(config.httpPort,function(){
  // console.log(`The server is listening on port ${config.httpPort}`);
  console.log('\x1b[36m%s\x1b[0m',`The HTTP server is listening on port ${config.httpPort}`);
  // console.log("The server is up and running on port '+config.httpPort+'");
});
  //Start the HTTPS server
  server.httpsServer.listen(config.httpsPort,function(){
  // console.log('The HTTPS server is listening on port' +  ` ${config.httpsPort}`);
  console.log('\x1b[35m%s\x1b[0m',`The HTTPS server is listening on port ${config.httpsPort}`);
});
};

// Export the module
module.exports = server;
