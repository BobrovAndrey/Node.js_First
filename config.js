/*
* Create and export configuration variables
*
*
*/

//Container for all environments
const environments = {};

//Staging (default) environmant

environments.staging = {
  'port' : 3000,
  'envName' : 'staging'
};

//Production environment
environments.production = {
  'port' : 5000,
  'envName' : 'production'
};

//Determine which environment was passed
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//currentEnvironment check is it one of the environments above? If its not => default

let environmantToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;


//Export the module

module.exports = environmentsToExport;