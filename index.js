/*
 * Primary file for the API
 */

 // Dependencies
 const http = require ('http');
 const url = require ('url');
 const StringDecoder = require('string_decoder').StringDecoder;

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
    buffer += decoder.wright(data);
  });

  req.on('end', function(){
    buffer += decoder.end();

     //Send the response
    res.end('Hello World\n');
    //Log the request path
    console.log ('Request recived with this payload', buffer);

  });

});

//Start server, and have it listen on port 3000
server.listen(3000,function(){
  console.log("The server is listening on port 3000 now");
});

