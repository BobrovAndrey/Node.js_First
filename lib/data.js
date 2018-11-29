/*
 *
 *
 *Library for storing and editing data
 */

 //Dependecies
 let fs = require('fs');
 let path = require('path');
 let helpers = require('./helpers');

 // Container for module (to be exported)
 let lib = {};

//Base directory of the data folder
lib.baseDir = path.join(__dirname,'/../.data/');
// basedir = '/d/GIT_repository/Node.js_First/.data/'
// lib.baseDir = './../.data/';
// basedir = './../.data/'

 //Write data to a file
 lib.create = function(dir,file,data,callback){
   //Open file for writing
   //let filepath = path.join(lib.baseDir, dir, file)
   //fs.open(filepath, 'wx', function(err,fileDescriptor){
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
            }else{
              callback('Error closing new file');
            }
          });
        }else{
          callback('Error writing to new file');
        }
      });
    } else {
      callback ('Couldnot create new file, it may already exist');
    }
   });
 };

 //Read data from a file
 lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8',function(err,data){
    if(!err && data){
      let parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
      callback(err,data);
    }
  });
 };


 //Update data inside a file
 lib.update = function (dir,file,data,callback){

  //Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+', function(err,fileDescriptor){
    if(!err && fileDescriptor){
      //Convert data to string
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
      callback('Could not open the file for update, it may not exist yet');
    }
  });
 };

 //Deleting a file
 lib.delete = function(dir, file, callback){

  //Unlink the file from the filesystem
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
    callback(err);
  });
 };

 //List all the items in the directory 
  lib.list = function (dir,callback){
    fs.readdir (lib.baseDir + dir + '/', function(err,data){
      if(!err && data && data.length > 0){
        let trimmedFileNames = [];
        data.forEach(function(fileName){
          trimmedFileNames.push (fileName.replace('.json',''));
        });
        callback(false,trimmedFileNames);
      } else {
        callback (err, data);
      }
    });
  };










 //Export the module
 module.exports = lib;

 