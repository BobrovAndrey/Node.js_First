/*
*
* Unit tests
*s
*/


//Dependecies
let helpers = require('./../lib/helpers.js');
let assert = require('assert');
let logs = require('./../lib/logs');
let exampleDebuggingProblem = require('./../lib/exampleDebuggingProblem');


//Holder for tests
let unit = {};


//Assert that the getANumber function is returning a number
unit['helpers.getANumber should return a number'] = function(done){
  let val = helpers.getANumber();
  assert.equal(typeof(val), 'number');
  done();
};

//Assert that the getANumber function is returning a number
unit['helpers.getANumber should return 1'] = function(done){
  let val = helpers.getANumber();
  assert.equal(val, 1);
  done();
};

//Assert that the getANumber function is returning a number 2
unit['helpers.getANumber should return 2'] = function(done){
  let val = helpers.getANumber();
  assert.equal(val, 2);
  done();
};

//Jogs.list should callback an array and a false error
unit['logs.list should callback a false error and an array of log names'] = function(done){
  logs.list(true,function(err,logFileNames){
    assert.equal(err, false);
    assert.ok(logFileNames instanceof Array);
    assert.ok(logFileNames.length > 1);
    done();
  });
};

//Logs.truncate should not throw if the logId doesnt exist
unit['logs.truncate should not throw if the logId does not exist. It should callback an error instead'] = function(done){
assert.doesNotThrow(function(){
 logs.truncate('I do not exist', function(err){
  assert.ok(err);
  done();
 });
}, TypeError);
};

// ExampleDebuggingProblem.init should not throw (but it does)
unit['exampleDebuggingProblem.init should not throw when called'] = function(done){
  assert.doesNotThrow(function(){
   exampleDebuggingProblem.init();
   done();
  }, TypeError);
  };
















//Export the text to the runner
module.exports = unit;