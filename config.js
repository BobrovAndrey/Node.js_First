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
  'envName' : 'staging'
};

//Production environment
environments.production = {
  'httpPort' : 5000,
  'httpsPort': 5001,
  'envName' : 'production'
};

//Determine which environment was passed
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';


//currentEnvironment check is it one of the environments above? If its not => default

let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//Export the module

module.exports = environmentToExport;
