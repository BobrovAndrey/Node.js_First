/*
* This is a test runner 
*/

//Dependecies
let helpers = require ('./../lib/helpers');
let assert = require ('assert');

//Aplication logic for the test runner
_app = {};

//Container for the test 
_app.tests = {
  'unit' : {}
};
//Assert that the getANumber function is returning a number
_app.tests.unit['helpers.getANumber should return number'] = function(done){
  let val = helpers.getANumber();
  assert.equal(typeof(val),'number');
  done();
};

//Assert that the getANumber function is returning a number
_app.tests.unit['helpers.getANumber should return 1'] = function(done){
  let val = helpers.getANumber();
  assert.equal(val,1);
  done();
};

//Assert that the getANumber function is returning a number 2
_app.tests.unit['helpers.getANumber should return 2'] = function(done){
  let val = helpers.getANumber();
  assert.equal(val,2);
  done();
};

//Run all test, collecting the errors and successes
_app.runTest = function () {
  let error = [];
  let sucsesses=0;
  let limit = _app.countTest();
  let counter = 0;
  for(let key in _app.tests){ 
    if(_app.test.hasOwnProperty(key)){
      let subTest = _app.tests[key];
      for(let testName in subTest){
        if(usubTest.hasOwnProperty(testName)){
          (function (){
            let tmpTestName = testName;
            let testValue = subTest[testName];
            //Call the test
            try{
              testValue(function(){
                //If its callback without throwing, then its succeeded 
              });
            }catch(e){ 
              
              //If it throws,then it failed, so capture the error thrown and log it in red


            }
          })();
        }
      }
    }
  }
};


//Run the test
_app.runTest();