/*
* Request handlers
*/


//Dependencies
let _data = require('./data');
let helpers = require('./helpers');

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
//Required data: firstName, lastName, phone, password, tosAgreement
//Optional data: none
handlers._users.post = function (data, callback){
  //Check that all required fields are filled out
  let firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0  ? data.payload.firstName.trim() : false;
  let lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0  ? data.payload.lastName.trim() : false;
  let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length >= 10  ? data.payload.phone.trim() : false;
  let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0  ? data.payload.password.trim() : false;
  let tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true  ? true : false;

  console.log('Payload data is: ', data.payload);
  console.log('firstName:', firstName)
  console.log('lastName:', lastName)
  console.log('phone:', phone)
  console.log('password:', password)
  console.log('tosAgreement:', tosAgreement)

  console.log('==== THIS IS USERS.POST METHOD ====')

  if(firstName && lastName && phone && password && tosAgreement){
    // Make sure that the user doesnt alredy exist
    _data.read('users' ,phone,function(err,data){
      if(err){
        //Hash the password
        let hashedPassword = helpers.hash(password);
        // пока оставь так, вечером посмотрим. спс
        // let hashedPassword = password;

        //Create the user object
        if (hashedPassword){
          let userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'phone' : phone,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true
          };
          //Store the user
          _data.create('users',phone,userObject,function(err){
            if (!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error': 'Could not create the new user'});
            }
          });
        } else {
          callback(500,{'Error': 'Could not hash the user\`s password'});
        }
    
      } else {
        //User alredy exist
        callback(400, {'Error': 'A user with that phone number already exist'});
      }
    });
  } else {
    callback (400, {'Error' : 'Missing required fields'});
  }
};
//Users - GET
//Required data : phone
//Optional data : none
// @TODO
// Only let an authenticated users acces thier object.
 handlers._users.get = function (data, callback){

  //Check that the phone number is valid
  let phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if (phone){
    //Lookup the user
    _data.read('users',phone,function(err,data){
      if(!err && data){
        // Remove the hashed password from thw user obj
        delete data.hashedPassword;
        callback (200, data);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error': 'Missing required field'});
  }
};

//Users - PUT
//Required data : phone
//Optional: firstName, lastName, password/ At least one must be specified
//@TODO Only let an autentificated  user update their own object
handlers._users.put = function (data, callback){
  let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  //Check for the optional fields
  let firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0  ? data.payload.firstName.trim() : false;
  let lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0  ? data.payload.lastName.trim() : false;
  let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0  ? data.payload.password.trim() : false;

  //Error if the phone is valid
  if (phone){
    //Error if nothing is sent to update
    if (firstName || lastName || password){
      //Lookup the user
      _data.read('users',phone,function(err,userData){
        if(!err && userData){
          //Update the fields necessary
          if(firstName){
            userData.firstName = firstName;
          }
          if(lastName){
            userData.lastName = lastName;
          }
          if(password){
            userData.hashedPassword = helpers.hash(password);
          }
          //Store the new updates
          _data.update('users', phone, userData,function(err){
            if(!err){
              callback (200);
            }else{
              console.log(err);
              callback(500,{'Error': 'Cpuld not update the user'});
            }
          });

        } else {
          callback(400,{'Error' : 'The spicified user does not exist'});
        }
      });
    }else{
      callback(400,{'Error': 'Missing fields to update'})
    }
  }else{
    callback(400,{'Error': 'Missing required field'});
  }
};
//Users - DELETE
//Required field : phone
//@TODO Only let an  authenticated user delete their object. 
//@TODO Cleanup (delete) any other data files associated with this user
handlers._users.delete = function(data,callback){
  //Ckeck that the phone number is valid
  let phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    //Lookup the user
    _data.read('users',phone,function(err,data){
      if(!err && data){
        _data.delete('users',phone,function(err){
          if(!err){
            callback (200);
          } else {
            callback (500,{'Error': 'Could not delete the specified user'});
          }
        });
      } else {
        callback(400,{'Error': 'Culd not finde the specified user'});
      }
    });
  } else {
    callback(400,{'Error': 'Missing required field'});
  }
};


//Tokens
handlers.tokens = function (data, callback){
  let acceptableMethods = ['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method)> -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

//Container for all the tokens methods
handlers._tokens = {};

//Tokens POST
//Required data: phone, password
//Optional data: none
handlers._tokens.post = function(data,callback){
  let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length >= 10 ? data.payload.phone.trim() : false;
  let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  console.log(`The phone is ${phone}`);
  console.log(`The password is ${password}`);

  if(phone && password){
    //Lookup the users who matches that phone number
    _data.read('users',phone,function(err,userData){
      if(!err && userData){
        //Hash the sent password, and compare it to password stored in the users object
        var hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          //If valid create a new token with rndom name. Set experation date 1 hour in the future
          let tokenId = helpers.createRandomString(20);
          let expires = Date.now() + 1000 * 60 * 60;
          let tokenObject = {
            'phone' : phone,
            'id' : tokenId,
            'expires' : expires
          };
          
          //Store the token
          _data.create('tokens', tokenId, tokenObject, function(err){
            if (!err){
              callback(200, tokenObject);
            } else {
              callback (500, {'Error': 'Could not create the new token'});
            }
          })
        } else {
          callback(400, {'Error': 'Password did not match the specified user\'s stored password'})
        }
      } else {
        callback (400, {'Error': 'Could not find the specified user'});
      }
    });
  } else {
    callback(400,{'Error': 'Missing required fields'});
  }
};

//Tokens GET
//Required data: id
//Optional data: none

handlers._tokens.get = function(data, callback){
  //Check that the id number is valid
  let id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id){
    //Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback (200, tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error': 'Missing required field'});
  }
};


//Tokens PUT
//Requier fields: id, extend
//Optional data: none
handlers._tokens.put = function(data, callback){
  let id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length >= 20 ? data.payload.id.trim() : false;
  let extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if (id && extend){
    //Lookup the token
    _data.read ('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        //Check to the make sure the token isn\`t already expire
        if(tokenData.expires > Date.now()){

          //Set the exparetion and hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;
           
          _data.update('tokens', id, tokenData, function(err){
            if(!err){
              callback(200);
            } else {
              callback (500, {'Error': 'Could not update the token\`s experetion'});
            }
          });
          //Store the new updates

        } else {
          callback (400, {'Error':'The token already expired, and cannot be extended'});
        }
      } else {
        callback(400,{'Error': 'Specified token do not exist'});
      }
    });
  }else{
    callback (400, {'Error':'Missing required fields or fields are invalid'});
  }
};

//Tokens DELETE
handlers._tokens.delete = function(data, callback){

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
