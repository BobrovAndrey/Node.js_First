/*
*
*Library for storing and rotating logs
*
*/


//Dependencies
let fs = require ('fs');
let path = require ('path');
let zlib = require ('zlib');


//Container for the module
let lib = {};

//Base directory of the logs folder
lib.baseDir = path.join(__dirname,'/../.logs/');

//Append a string to a file. Create the file if it does not exist
lib.append = function (file,str,callback){
  //Opening the file appending
  fs.open(lib.baseDir + file + '.log','a',function(err,fileDescriptor){
    if(!err && fileDescriptor){
       //Append to the file and close it
       fs.appendFile(fileDescriptor,str+'\n',function(err){
         if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            }else{
              callback('Error closing file that was being appended');
            }
          });
         } else {
           callback('Error appending to file');
         }
       })

    } else {
      callback('Could not open file for appending');
    }
  })

};


//List all logs and optionally include the compressed logs
lib.list = function(includeCompressedLogs,callback){
  fs.readdir(lib.baseDir,function(err,data){
    if(!err && data && data.length > 0) {
      let trimmedFileNames = [];
      data.forEach(function(fileName){
        //Add the .log filess
        if(fileName.indexOf('.log') > -1){
          trimmedFileNames.push(fileName.replace('.log',''));
        }
        //Add
      })
    } else {
      callback(err,data);
    }
  });
};


//Export the module
module.exports = lib;






