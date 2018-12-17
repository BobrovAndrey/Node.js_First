/*
* Request handlers
*/
// Dependencies
// let _data = require('./data')
// let helpers = require('./helpers')
// let config = require('./config')
// let _url = require('url');
// let dns = require ('dns');

var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');
var dns = require('dns');
var _url = require('url');
var _performance = require('perf_hooks').performance;
var util = require('util');
var debug = util.debuglog('performance');

// Define the hadlers
let handlers = {}

/*
*
*HTML Handlers
*
*/

// Index handler

handlers.index = function (data, callback) {
  // Regect all request, that isnt a GET
  if (data.method === 'get') {
    // Pepare data for interpolation
    let templateData = {
      ' head.title': 'Uptime Monitoring - Made Simple ',
      ' head.description': 'We offer free, simple uptime monitoring for HTTP/HTTPS sites of all kindes. When your site goes down, we will send you text to let you know ',
      // 'body.title' : 'Hello templated world!',
      ' body.class': 'index'
    }

    // Read in a template as a string
    helpers.getTemplate('index', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversaltemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback (200, str, 'html')
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback (500, undefined, 'html')
      }
    })
  } else {
    callback(405, undefined, 'html')
  }
}

// Create Account handler
handlers.accountCreate = function (data, callback) {
  if (data.method === 'get') {
    // Pepare data for interpolation
    let templateData = {
      ' head.title': 'Create an Account',
      ' head.description': 'Singup is easy and only takes a few seconds.',
      // 'body.title' : 'Hello templated world!',
      ' body.class': 'accountCreate'
    }

    // Read in a template as a string
    helpers.getTemplate('accountCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversaltemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback (200, str, 'html')
          } else {
            callback (500, undefined, 'html')
          }
        })
      } else {
        callback (500, undefined, 'html')
      }
    })
  } else {
    callback (405, undefined, 'html')
  }
}

// Create New Session
handlers.sessionCreate = function (data, callback) {
  if (data.method === 'get') {
    // Pepare data for interpolation
    let templateData = {
      ' head.title': 'Login to your Account',
      ' head.description': 'Please enter your phone number and password to access your account.',
      // 'body.title' : 'Hello templated world!',
      ' body.class': 'sessionCreate'
    }

    // Read in a template as a string
    helpers.getTemplate('sessionCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversaltemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback (200, str, 'html')
          } else {
            callback (500, undefined, 'html')
          }
        })
      } else {
        callback (500, undefined, 'html')
      }
    })
  } else {
    callback (405, undefined, 'html')
  }
};



// // Edit Your Account
// handlers.accountEdit = function(data,callback){
//   // Reject any request that isn't a GET
//   if(data.method == 'get'){
//     // Prepare data for interpolation
//     var templateData = {
//       'head.title' : 'Account Settings',
//       'body.class' : 'accountEdit'
//     };
//     // Read in a template as a string
//     helpers.getTemplate('accountEdit',templateData,function(err,str){
//       if(!err && str){
//         // Add the universal header and footer
//         helpers.addUniversaltemplates(str,templateData,function(err,str){
//           if(!err && str){
//             // Return that page as HTML
//             callback(200,str,'html');
//           } else {
//             callback(500,undefined,'html');
//           }
//         });
//       } else {
//         callback(500,undefined,'html');
//       }
//     });
//   } else {
//     callback(405,undefined,'html');
//   }
// };

// Edit Your Account
handlers.accountEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };
          console.log(`STR: ${JSON.stringify(templateData)}`);
          // console.log(`templateData: ${templateData}`);
    // Read in a template as a string
    helpers.getTemplate('accountEdit', templateData, function(err,str){
      console.log('Error is:', err)
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversaltemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out of your account.',
      'body.class' : 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversaltemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};


// Create a new check
handlers.checksCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create a New Check',
      'body.class' : 'checksCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('checksCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversaltemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};


// Dashboard ( view all checks)
// Edit Your Account
handlers.checksList = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Dashboard',
      'body.class' : 'checksList'
    };
          console.log(`STR: ${JSON.stringify(templateData)}`);
          // console.log(`templateData: ${templateData}`);
    // Read in a template as a string
    helpers.getTemplate('checksList', templateData, function(err,str){
      console.log('Error is:', err)
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversaltemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'You account has been deleted',
      'body.class' : 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversaltemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit a check
handlers.checksEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Check Details',
      'body.class' : 'checksEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('checksEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversaltemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};


// // Session has been deleted
// handlers.sessionDeleted = function(data,callback) {
//   if(data.method == 'get') {
//     // Pepare data for interpolation
//     let templateData = {
//       'head.title' : 'Logged Out',
//       'head.description': 'You have been logged out of your account',
//       // 'body.title' : 'Hello templated world!',
//       'body.class': 'sessionDeleted'
//     }

//     // Read in a template as a string
//     helpers.getTemplate('sessionDeleted',templateData,function(err,str) {
//       if (!err && str) {
//         // Add the universal header and footer
//         helpers.addUniversaltemplates(str,templateData,function (err,str){
//           if(!err && str) {
//             // Return that page as HTML
//             callback (200, str, 'html')
//           } else {
//             callback (500, undefined, 'html')
//           }
//         });
//       } else {
//         callback (500, undefined, 'html')
//       }
//     });
//   } else {
//     callback (405, undefined, 'html')
//   }
// };


// // Edit your account
// handlers.accountEdit = function(data,callback) {
//   if(data.method == 'get') {
//     // Pepare data for interpolation
//     let templateData = {
//       'head.title' : 'Account Edit',
//       'head.description': 'You have been logged out of your account',
//       // 'body.title' : 'Hello templated world!',
//       'body.class': 'accountEdit'
//     }

//     // Read in a template as a string
//     helpers.getTemplate('accountEdit',templateData,function(err,str) {
//       if (!err && str) {
//         // Add the universal header and footer
//         helpers.addUniversaltemplates(str,templateData,function (err,str){
//           if(!err && str) {
//             // Return that page as HTML
//             callback (200, str, 'html')
//           } else {
//             callback (500, undefined, 'html')
//           }
//         });
//       } else {
//         callback (500, undefined, 'html')
//       }
//     });
//   } else {
//     callback (405, undefined, 'html')
//   }
// };



// Favicon
handlers.favicon = function (data, callback){
  // Regect all request, that isnt a GET
  if (data.method === 'get') {
    //Read in the favicons data
    helpers.getStaticAsset('favicon.ico',function(err,data){
      if (!err && data){
        //Callback the data
        callback(200,data,'favicon');
      } else {
        callback(500);
      }
    })
  } else {
    callback(405);
  }
};

//Public assets
handlers.public = function(data,callback){
  //Regect all request, that isnt a GET
  if(data.method == 'get'){
    //Get the filename being requested
      let trimmedAssetName = data.trimmedPath.replace('public/','').trim();
      if(trimmedAssetName.length > 0) {
        //Read in the assets data
        helpers.getStaticAsset(trimmedAssetName,function(err,data){
          if(!err && data){
            //Determine the content type (default to plain text)
            let contentType = 'plain';

            if(trimmedAssetName.indexOf('.css') > -1){
              contentType = 'css';
            }

            if(trimmedAssetName.indexOf('.png') > -1){
              contentType = 'png';
            }

            if(trimmedAssetName.indexOf('.jpg') > -1){
              contentType = 'jpg';
            }

            if(trimmedAssetName.indexOf('.ico') > -1){
              contentType = 'favicon';
            }

            //Callback the data
            callback (200,data,contentType);

          } else {
            callback(404);
          }
        });
      } else {
        callback (404);
      }
  } else {
    callback(405);
  }
};

/*
*
* JSON API Handlers
*
*/
//Example error
handlers.exampleError = function (data, callback){
  let err = new Error('This is an example error');
  throw(err);
};


handlers.users = function (data, callback){
  console.log("This is a handler.user function");
  let acceptableMethods = ['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method)> -1){
    console.log('we are inside handlers.users', data)
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
 handlers._users.get = function (data, callback){

  //Check that the phone number is valid
  let phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length >= 10 ? data.queryStringObject.phone.trim() : false;
  console.log('phone is: ', phone)
  if (phone){
    //Get the tokens from the headers
    let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //verify that the given token is vslid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if (tokenIsValid){
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
        callback(403, {'Error':'Missing required token in header or token is invalid'})
      }
    });
  } else {
    callback(400,{'Error': 'Missing required field'});
  }
};

//Users - PUT
//Required data : phone
//Optional: firstName, lastName, password/ At least one must be specified
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
      //Get the tokens from the headers
      let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

      //verify that the given token is vslid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){

      if (tokenIsValid){
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
              callback(500,{'Error': 'Could not update the user'});
            }
          });
        } else {
          callback(400,{'Error' : 'The spicified user does not exist'});
        }
      });
      } else {
        callback(403, {'Error':'Missing required token in header or token is invalid'})
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
handlers._users.delete = function(data,callback){
  //Ckeck that the phone number is valid
  let phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){

     //Get the tokens from the headers
     let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

     //verify that the given token is vslid for the phone number
     handlers._tokens.verifyToken(token,phone,function(tokenIsValid){

     if (tokenIsValid){
      //Lookup the user
     _data.read('users',phone,function(err,userData){
      if(!err && userData){
        //Delete the users data
        _data.delete('users',phone,function(err){
          if(!err){
            //Delete all the checks associated with the user
            let userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
            let checksToDelete = userChecks.length;
            if(checksToDelete > 0){
               let checksDeleted = 0;
               let deletionErrors = false;
               //Loop throught the checks
               userChecks.forEach(function(checkId){
                //Delete the check
                _data.delete('checks',checkId,function(err){
                  if(err){
                    deletionErrors = true;
                  } 
                    checksDeleted++;
                    if(checksDeleted == checksToDelete){
                      if(!deletionErrors){
                        callback (200);
                      } else {
                        callback (500,{'Error': 'Errors encountered while attempting to delete all of the users checks'})
                      }
                    }
                });
               });
            } else {
              callback (200);
            }
          } else {
            callback (500,{'Error': 'Could not delete the specified user'});
          }
        });
      } else {
        callback(400,{'Error': 'Could not find the specified user'});
      }
    });
     }else{
      callback(403, {'Error':'Missing required token in header or token is invalid'});
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

// phoneIsValid = (phone) => {
//   if (typeof phone !== 'string') return false

//   const trimmedPhone = phone.trim()
  
//   return trimmedPhone.length >= 10
// };

//Tokens POST
//Required data: phone, password
//Optional data: none
handlers._tokens.post = function(data,callback){

  _performance.mark('entered function');

  let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length >= 10 ? data.payload.phone.trim() : false;
  // let phone = phoneIsValid(data.payload.phone);
  let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  console.log(`The phone is ${phone}`);
  console.log(`The password is ${password}`);

  _performance.mark('inputs validated');

  if(phone && password){

    _performance.mark('beginning user lookup');

    //Lookup the users who matches that phone number
    _data.read('users',phone,function(err,userData){

      _performance.mark('user lookup complete');

      if(!err && userData){

        _performance.mark('beginning password hashing');

        //Hash the sent password, and compare it to password stored in the users object
        var hashedPassword = helpers.hash(password);

        _performance.mark('password hashing complete');

        if(hashedPassword == userData.hashedPassword){

          _performance.mark('creating data for token');

          //If valid create a new token with rndom name. Set experation date 1 hour in the future
          let tokenId = helpers.createRandomString(20);
          let expires = Date.now() + 1000 * 60 * 60;
          let tokenObject = {
            'phone' : phone,
            'id' : tokenId,
            'expires' : expires
          };
          
          //Store the token
          _performance.mark('beginning storing token');

          _data.create('tokens', tokenId, tokenObject, function(err){

            _performance.mark('storing token complete');

            //Gather all the measurements
            _performance.measure('Beggining to end ', 'entered function', 'storing token complete');
            _performance.measure('Validating user input ', 'entered function', 'inputs validated');
            _performance.measure('users lookup ', 'beginning user lookup', 'user lookup complete');
            _performance.measure('Password Hashing ', 'beginning password hashing', 'password hashing complete');
            _performance.measure('Token data creation ' , 'creating data for token', 'beginning storing token');
            _performance.measure('Token storing ', 'beginning storing token', 'storing token complete');

            //Log put all measurments
            let measurments = _performance.getEntriesByType('measure');
            measurments.forEach(function(measurment){
              debug('\x1b[33m%s\x1b[0m',measurment.name+ `` + measurment.duration);
            });

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
//Required data: id
//Optional data: none

handlers._tokens.delete = function(data, callback){
   //Check that the id is valid
   let id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
   if(id){
    //Lookup the user
    _data.read('tokens',id,function(err,data){
      if(!err && data){
        _data.delete('tokens',id,function(err){
          if(!err){
            callback (200);
          } else {
            callback (500,{'Error': 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error': 'Could not find the specified user'});
      }
    });
  } else {
    callback(400,{'Error': 'Missing required field'});
  }
};

//Verify if a giben id is currently valid for a given user
handlers._tokens.verifyToken = function(id,phone,callback){
  //Lookup the token
  _data.read('tokens',id, function(err,tokenData){
    if(!err && tokenData){
      //Check tha the token is for the given user and has not be expired
      if(tokenData.phone == phone && tokenData.expires > Date.now()){
        callback(true);
      } else {
        callback (false);
      }
    } else {
      callback(false);
    }
  })
};

//Checks
handlers.checks = function (data, callback){
  let acceptableMethods = ['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method)> -1){
    handlers._checks[data.method](data,callback);
  } else {
    callback(405);
  }
};

//Container for all the checks methods
handlers._checks = {};

//Checks POST
//Required data: potocol, url, method, successCodes, timeoutSeconds
// Optional data: none


handlers._checks.post = function(data,callback){
  //Validate inputs
  
  let protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  let url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  let method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  let successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  let timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  if (protocol && method && url && successCodes && timeoutSeconds){

    //Get the tokens for the headers
    let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    //Lookup the user by reading the token
    _data.read('tokens', token, function(err,tokenData){
      if(!err && tokenData){
        let userPhone = tokenData.phone;
        
        //Lookup the user data
       _data.read('users',userPhone, function(err,userData){
          if(!err && userData){
            let userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
            //Verify that user has less than the number of max-checks per user
            if(userChecks.length < config.maxChecks){

              //Verify that the URL given has DNS entries (and therefore can resolve)
              let parsedUrl = _url.parse(protocol+'://'+url, true);
              let hostName = typeof(parsedUrl.hostname) == 'string' && parsedUrl.hostname.length > 0 ? parsedUrl.hostname : false;
              dns.resolve(hostName,function(err,records){
                if(!err && records){
                  //Create a random id for the check
                  let checkId = helpers.createRandomString(20);

                  //Create the check object, and include the user`s phone
                  let checkObject = {
                    'id' : checkId,
                    'userPhone' : userPhone,
                    'protocol' : protocol,
                    'url' : url,
                    'method' : method,
                    'successCodes' : successCodes,
                    'timeoutSeconds' : timeoutSeconds
                  };

                  //Save the object
                  _data.create('checks',checkId,checkObject,function(err){
                    if(!err){
                      //Add the check id to the user`s object
                      userData.checks = userChecks;
                      userData.checks.push(checkId);

                      //Save the new user data
                      _data.update('users',userPhone,userData,function(err){
                        if(!err){
                          //Return the data about the new check
                          callback(200,checkObject);
                        } else {
                          callback(500, {'Error' : 'Could not update the user with the new check'});
                        }
                      });
                    } else {
                      callback (500, {'Error': 'Could not create the new check'});
                    }
                  });
                } else {
                  callback (400, {'Error': 'The hostname of the URL entered did not reolve to any DNS entries'});
                }
              });
            } else {
              // callback(400,{'Error' : 'The user already has the maximum number of checks ('+config.maxChecks+').'})
              callback (400, {'Error': `The user already has the maximum numbers of checks ${config.maxChecks}`})
            }
          } else {
            callback (403);
          }
        });

      }else{
        callback(403);
      }
    });

   } else {
    callback (400,{'Error': 'Missing required inputs, or inputs are invalid'});
  }
};


//Checks GET
// Required data : id
//Optional data : none
handlers._checks.get = function (data, callback){

  //Check that the id is valid
  let id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id){

    //Lookup the check
    _data.read('checks',id,function(err,checkData){
      if(!err && checkData){
        //Get the token that sent the request
        let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        //verify that the given token is valid and belongs to the users who created the check
        console.log("This is check data",checkData);
        handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
          if(tokenIsValid){
            //Return the check data
            callback(200,checkData);
          } else {
            callback(403);
          }
        });
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error': 'Missing required field'});
  }
};

//Checks PUT
//Required data: id
//Optional data: protocol, url, method, successCodes, timeoutSeconds

handlers._checks.put = function (data, callback){
  //Check for the required field
  let id = typeof(data.payload.id ) == 'string' && data.payload.id .trim().length == 20 ? data.payload.id.trim() : false;

  //Check for the optional fields
  let protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  let url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  let method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  let successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  let timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  //Check to make sure id is valid
  if(id){
    //Check, that one or more optional fileds has been send 
    if (protocol || url || method || successCodes || timeoutSeconds){
      // Lookup the check
      _data.read('checks', id, function(err, checkData){
        if(!err && checkData){
          //Get the tokens from the headers
        let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        //verify that the given token is valid for the phone number
        handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
          if (tokenIsValid){
            //Update the check where necessary
           if (protocol){
             checkData.protocol = protocol;
           }
           if (url){
            checkData.url = url;
           }
           if (method){
            checkData.method = method;
           }
           if (successCodes){
            checkData.successCodes = successCodes;
           }
           if (timeoutSeconds){
            checkData.timeoutSeconds = timeoutSeconds;
           }

           //Store the updates
           _data.update('checks',id,checkData, function(err){
            if(!err){
              callback(200);
            } else {
              callback(500, {'Error': 'Could not update the check'});
            }
           });
          } else {
            callback (403);
          }
        });
        } else {
          callback (400, {'Error': 'Chek ID did not exist'});
        }
      });
    } else {
      callback (400, {'Error': 'Missing fields to update'});
    } 
  } else {
    callback(400, {'Error': 'Missiong required field'});
  }
};

//Checks DELETE
//Required data: id
// Optional data: none
handlers._checks.delete = function(data,callback){
  //Ckeck that the id is valid
  let id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){

    // Lookup the check
    _data.read('checks', id, function(err, checkData){
      if(!err && checkData){
        //Get the tokens from the headers
     let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

     //verify that the given token is vslid for the phone number
     handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){

     if (tokenIsValid){
      //Delete the check data
      _data.delete('checks',id,function(err){
        if(!err){ 
        //Lookup the user
        _data.read('users',checkData.userPhone,function(err,userData){
          if(!err && userData){
            let userChecks = typeof (userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];

            //Remove the deleted check from their list of checks
            let checkPosition = userChecks.indexOf(id);
            if(checkPosition > -1){
              userChecks.splice(checkPosition,1);
              //Re-saved the users data
              _data.update('users',checkData.userPhone,userData,function(err){
                if(!err){
                  callback (200);
                } else {
                  callback (500,{'Error': 'Could not update the user'});
                }
              });
            } else {
              callback(500,{'Error':'Could not finde the check on the users object, so could not remove it'});
            }
            
            } else {
              callback(500,{'Error': 'Could not find the user who created the check, so could not remove the check from the list of checks on the user object'});
            }
          });
        } else {
          callback (500, {'Error':'Could not delete the check data'});
        }
      });
     }else{
      callback(403);
     }
    });
      } else {
        callback (400, {'Error':'The spesified '})
      }
    });
     
  } else {
    callback(400,{'Error': 'Missing required field'});
  }
};
 
//Ping handler
handlers.ping = function(data, callback){
  callback(200);
};

//Not found handler
handlers.notFound = function (data, callback){
  callback (404, {'Error': 'Handler not found'});
};

//Export the module

module.exports = handlers;
