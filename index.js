/*
 * Primary file for the API
 */

 // Dependencies
 const http = require ('http');
 const url = require ('url');

//The server should respond to all requests with a string
let server = http.createServer(function(req, res){

  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  //Get the path 
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  //get the querystring as an object

  // const queryStringObject = parsedUrl.query;
  

  //Get the HTTP Method
  const method = req.method.toLowerCase();


  //Send the response
  res.end('Hello World\n');
  //Log the request path
  console.log('Request recived on path: ' + trimmedPath +'with this method: ' + method 
  // + 'and with these query string parametrs',+ queryStringObject
  );


});

//Start server, and have it listen on port 3000
server.listen(3000,function(){
  console.log("The server is listening on port 3000 now");
});

