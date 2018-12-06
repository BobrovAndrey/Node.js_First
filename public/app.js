/*
 * Frontend Logic for application
 *
 */

//Container for a front-end application
 let app = {};

 //Config
 app.config = {
  'sessionToken' : false
};

 //AJAX Client for the RESTfull API
 app.client = {}
// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){
  //Set default
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  //Add the querystring params
  let requestUrl = path+'?';
  let counter = 0;
  for(var queryKey in queryStringObject){
    if(queryStringObject.hasOwnProperty(queryKey)){
      counter++;
      // If at least one query string parameter has already been added, preprend new ones with an ampersand
      if(counter > 1){
        requestUrl+='&';
      }
      //Add the key and value
      requestUrl+=queryKey+'='+queryStringObject[queryKey];
    } 
  }

    //Form the HTTP request as a JSON type
    let xhr = new XMLHttpRequest();
    xhr.open(method, requestUrl, true);
    xhr.setRequestHeader("Content-type", "application/json");

    //For each header send, add it to request
      for(var headerKey in headers){
        if(headers.hasOwnProperty(headerKey)){
          xhr.setRequestHeader(headerKey, headers[headerKey]);
        }
    }
  
      //If there is a session token set, add that as a header
      if(app.config.sessionToken){
        xhr.setRequestHeader("token", app.config.sessionToken.id);
      }
         
      //Whern the request comes back, handle the response
      xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE) {
          let statusCode = xhr.status;
          let responseReturned = xhr.responseText;
  
      //Callback if requested
        if(callback){
          try{
            let parsedResponse = JSON.parse(responseReturned);
             callback(statusCode,parsedResponse);
            } catch(e){
              callback(statusCode,false);
          }
        }
      }
    }
      
      // Send the payload as JSON
      let payloadString = JSON.stringify(payload);
      xhr.send(payloadString);

 };
//  console.log("Hello Console World!!");


