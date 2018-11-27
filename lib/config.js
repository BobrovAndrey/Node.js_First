/*
* Create and export configuration variables
*
*
*/

//Container for all environments
let environments = {};

//Staging (default) environmant

environments.staging = {
  'httpPort' : 3000,
  'httpsPort': 3001,
  'envName' : 'staging',
  'hashingSecret': 'thisIsASecret',
  'maxChecks': 5,
  'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  }
};

//Production environment
environments.production = {
  'httpPort' : 5000,
  'httpsPort': 5001,
  'envName' : 'production',
  'hashingSecret': 'thisIsAlsoASecret',
  'maxChecks': 5,
  'twilio': {
    'accountSid':'',
    'authToken':'',
    'fromPhone':''
  }
};

//Determine which environment was passed
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';


//currentEnvironment check is it one of the environments above? If its not => default

let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//Export the module

module.exports = environmentToExport;
