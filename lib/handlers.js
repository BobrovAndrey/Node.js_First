/*
* Request handlers
*/


//Dependencies


//Define the hadlers
let handlers = {};

handlers.users = function (data, callback){
  let acceptableMethods = ['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method)> -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

//Container for the users submethods

handlers._users = {};

//Users - POST
handlers._users.post = function (data, callback){

};
//Users - GET
handlers._users.get = function (data, callback){

};
//Users - PUT
handlers._users.put = function (data, callback){

};
//Users - DELETE
handlers._users.delete = function (data, callback){

};


//Ping handler
handlers.ping = function(data, callback){
  callback(200);
};

//Not found handler
handlers.notFound = function (data, callback){
  callback (404);
};

//Export the module

module.exports = handlers;