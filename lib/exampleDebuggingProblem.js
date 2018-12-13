/*
* Library that demonstrate something throwing when its init() is called
*/


//Container for the module
let example = {};

//Init funtion
example.init = function(){
  //This is an error created intentionally (bar is not defined)
  let foo = bar;

}

module.exports = example;
