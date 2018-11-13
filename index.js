/*
 * Primary file for the API
 */

 // Dependencies
 const http = require ('http');
 const url = require ('url');
 const StringDecoder = require('string_decoder').StringDecoder;
 const config = require('./config');

//The server should respond to all requests with a string
let server = http.createServer(function(req, res){

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
      'payload' : buffer 
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
});

// //Start the server
server.listen(config.port,function(){
  // console.log('The server is listening on port' +  `${config.port}` +  'in' +  `${config.envName}` +  'mode');
  console.log('The server is up and running on port '+config.port+' in '+config.envName+' mode.');
});

// server.listen(config.port,function(){
//   console.log('The server is up and running on port '+config.port+' in '+config.envName+' mode.');
// });

//Define the hndlers

let handlers = {};

//Sample handler
handlers.sample = function(data, callback){
  //Callback a http status code, and a payload object
  callback(406, {'name' : 'sample handler'});
};

//Not found handler
handlers.notFound = function (data, callback){
  callback (404);
};

//Define a request router
let router = {
  'sample': handlers.sample
};
