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
  let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10  ? data.payload.phone.trim() : false;
  let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0  ? data.payload.password.trim() : false;
  let tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true  ? true : false;

  console.log(data)

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
  let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
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
handlers._tokens.get = function(data, callback){

};

//Tokens PUT
handlers._tokens.put = function(data, callback){

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

// /*
//  * Request Handlers
//  *
//  */

// // Dependencies
// var _data = require('./data');
// var helpers = require('./helpers');

// // Define all the handlers
// var handlers = {};

// // Ping
// handlers.ping = function(data,callback){
//     callback(200);
// };

// // Not-Found
// handlers.notFound = function(data,callback){
//   callback(404);
// };

// // Users
// handlers.users = function(data,callback){
//   var acceptableMethods = ['post','get','put','delete'];
//   if(acceptableMethods.indexOf(data.method) > -1){
//     handlers._users[data.method](data,callback);
//   } else {
//     callback(405);
//   }
// };

// // Container for all the users methods
// handlers._users  = {};

// // Users - post
// // Required data: firstName, lastName, phone, password, tosAgreement
// // Optional data: none
// handlers._users.post = function(data,callback){
//   // Check that all required fields are filled out
//   var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
//   var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
//   var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
//   var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
//   var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

//   if(firstName && lastName && phone && password && tosAgreement){
//     // Make sure the user doesnt already exist
//     _data.read('users',phone,function(err,data){
//       if(err){
//         // Hash the password
//         var hashedPassword = helpers.hash(password);

//         // Create the user object
//         if(hashedPassword){
//           var userObject = {
//             'firstName' : firstName,
//             'lastName' : lastName,
//             'phone' : phone,
//             'hashedPassword' : hashedPassword,
//             'tosAgreement' : true
//           };

//           // Store the user
//           _data.create('users',phone,userObject,function(err){
//             if(!err){
//               callback(200);
//             } else {
//               console.log(err);
//               callback(500,{'Error' : 'Could not create the new user'});
//             }
//           });
//         } else {
//           callback(500,{'Error' : 'Could not hash the user\'s password.'});
//         }

//       } else {
//         // User alread exists
//         callback(400,{'Error' : 'A user with that phone number already exists'});
//       }
//     });

//   } else {
//     callback(400,{'Error' : 'Missing required fields'});
//   }

// };

// // Required data: phone
// // Optional data: none
// // @TODO Only let an authenticated user access their object. Dont let them access anyone elses.
// handlers._users.get = function(data,callback){
//   // Check that phone number is valid
//   var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
//   if(phone){
//     // Lookup the user
//     _data.read('users',phone,function(err,data){
//       if(!err && data){
//         // Remove the hashed password from the user user object before returning it to the requester
//         delete data.hashedPassword;
//         callback(200,data);
//       } else {
//         callback(404);
//       }
//     });
//   } else {
//     callback(400,{'Error' : 'Missing required field'})
//   }
// };

// // Required data: phone
// // Optional data: firstName, lastName, password (at least one must be specified)
// // @TODO Only let an authenticated user up their object. Dont let them access update elses.
// handlers._users.put = function(data,callback){
//   // Check for required field
//   var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

//   // Check for optional fields
//   var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
//   var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
//   var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

//   // Error if phone is invalid
//   if(phone){
//     // Error if nothing is sent to update
//     if(firstName || lastName || password){
//       // Lookup the user
//       _data.read('users',phone,function(err,userData){
//         if(!err && userData){
//           // Update the fields if necessary
//           if(firstName){
//             userData.firstName = firstName;
//           }
//           if(lastName){
//             userData.lastName = lastName;
//           }
//           if(password){
//             userData.hashedPassword = helpers.hash(password);
//           }
//           // Store the new updates
//           _data.update('users',phone,userData,function(err){
//             if(!err){
//               callback(200);
//             } else {
//               console.log(err);
//               callback(500,{'Error' : 'Could not update the user.'});
//             }
//           });
//         } else {
//           callback(400,{'Error' : 'Specified user does not exist.'});
//         }
//       });
//     } else {
//       callback(400,{'Error' : 'Missing fields to update.'});
//     }
//   } else {
//     callback(400,{'Error' : 'Missing required field.'});
//   }

// };

// // Required data: phone
// // @TODO Only let an authenticated user delete their object. Dont let them delete update elses.
// // @TODO Cleanup (delete) any other data files associated with the user
// handlers._users.delete = function(data,callback){
//   // Check that phone number is valid
//   var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
//   if(phone){
//     // Lookup the user
//     _data.read('users',phone,function(err,data){
//       if(!err && data){
//         _data.delete('users',phone,function(err){
//           if(!err){
//             callback(200);
//           } else {
//             callback(500,{'Error' : 'Could not delete the specified user'});
//           }
//         });
//       } else {
//         callback(400,{'Error' : 'Could not find the specified user.'});
//       }
//     });
//   } else {
//     callback(400,{'Error' : 'Missing required field'})
//   }
// };



// // Export the handlers
// module.exports = handlers;