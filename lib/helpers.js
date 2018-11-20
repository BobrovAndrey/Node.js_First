/*
* Helpers fo various tasks
*
*/
//Dependencies
let config = require('./config');
let crypto = require('crypto');

//Container for all helpers
let helpers = {};

//Parse a JSON string to an object  in all cases, without throwing
helpers.parseJsonToObject = function(str){
  try{
    let obj = JSON.parse(str);
    return obj;
  }catch(e){
    return {};
  }
};

// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function (strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if (str){
    //Define all posible characters that could go into string
    let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    //Start the final string
    let str = '';
    for ( i=1; i<= strLength; i++){
      //Get a random character from the possible characters
       let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      //Append this character to a final string
      str += randomCharacter;
    }

    //Return the final string
    return str;

  } else {
    return false;
  }
}

//Create a SHA256 hash
// helpers.hash = function(str){
//   if(typeof(str) == 'string' && str.length > 0){
//     let hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
//     return hash;
//   } else {
//     return false;
//   }
// };


helpers.hash = function(str) {
  return crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex')
}


//Export the module
module.exports = helpers;

// /*
//  * Helpers for various tasks
//  *
//  */

// // Dependencies
// var config = require('./config');
// var crypto = require('crypto');

// // Container for all the helpers
// var helpers = {};

// // Parse a JSON string to an object in all cases, without throwing
// helpers.parseJsonToObject = function(str){
//   try{
//     var obj = JSON.parse(str);
//     return obj;
//   } catch(e){
//     return {};
//   }
// };

// // Create a SHA256 hash
// helpers.hash = function(str){
//   if(typeof(str) == 'string' && str.length > 0){
//     var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
//     return hash;
//   } else {
//     return false;
//   }
// };
// // Export the module
// module.exports = helpers;