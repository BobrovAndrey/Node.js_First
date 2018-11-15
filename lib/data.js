/*
 *
 *
 *Library for storing and editing data
 */

 //Dependecies
 let fs = require('fs');
 let path = require('path');

 // Container for module (to be exported)
 let lib = {};

//Base directory of the data folder
lib.baseDir = path.join(__dirname,'/../.data/');

 //Write data to a file
 lib.create = function(dir, file, data, callback){
   //Open file for writing
   fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err,fileDescriptor){
    if(!err && fileDescriptor){
      //Convert data to string
      let stringData = JSON.stringify(data);
      //Write to file and close it
      fs.writeFile(fileDescriptor,stringData,function(err){
        if(!err){
          fs.close(fileDescriptor, function(err){
            if (!err){
              callback(false);
            }
          });
        }else{
          callback('Error writing to new file');
        }
      })
    } else {
      callback ('Couldnot create new file, it may already exist');
    }
   });
 }

 //Read data from a file

 lib.read = function(dir, file, callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8',function(err,data){
    callback(err,data);
  })
 };


 //Update data inside a file
 lib.update = function (dir,file,data,callback){
  //Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+', function(err,fileDescriptor){
    if(!err && fileDescriptor){
      let stringData = JSON.stringify(data);

      //Trunate the file 
      fs.truncate (fileDescriptor, function(err){
        if(!err){
          //Write to the file and close it
          fs.writeFile(fileDescriptor, stringData, function(err){
            if(!err){
              fs.close(fileDescriptor, function(err){
                if(!err){
                  callback(false);
                } else {
                  callback ('Error closing existing file');
                }
              });
            } else {
             callback ('Error writing to existing file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });

    } else {
      callback ('Could not open the file for update, it may not exist yet');
    }
  });
 };

 //Deleting a file
 lib.delete = function(dir, file, callback){
  //Unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
    if(!err){
      callback(false);
    } else {
      callback('Error deleting file');
    }
  })
 };

 //Export the module
 module.exports = lib;

