/*
*CLI related tasks
*/

//Dependencies
const readline = require('readline');
const util = require('util');
const debug = util.debuglog('cli');
const events = require('events');
class _events extends events{};
const e = new _events();

//Instantiate the CLI module object

const cli = {};

//Input handlers
e.on('man',function(str){
  cli.responders.help();
});
e.on('help',function(str){
  cli.responders.help();
});
e.on('exit',function(str){
  cli.responders.exit();
});
e.on('stats',function(str){
  cli.responders.stats();
});
e.on('list users',function(str){
  cli.responders.listUsers();
});
e.on('more user info',function(str){
  cli.responders.moreUserInfo(str);
});
e.on('list checks',function(str){
  cli.responders.listChecks(str);
});
e.on('more check info',function(str){
  cli.responders.moreCheckInfo(str);
});
e.on('list logs',function(str){
  cli.responders.listLogs();
});
e.on('more log info',function(str){
  cli.responders.moreLogInfo(str);
});
//Responders object
cli.responders = {};

//Help / Man
cli.responders.help = function(){
  let commands = {
    'exit':'Kill the CLI(and the rest of aplication)',
    'man':'Show this help page',
    'help':'Alias of the "man" command',
    'stats':'Get statistics on the underlying opereting system and resource utilization',
    'list users':'Show a list af all the registred (undelited) users in the system',
    'more user info --{userId}':'Show details of the specific user',
    'list checks --up --down':'Show a list of all checks in the system, including their state. The "--up" and the "--down" flags are bouth optional ',
    'more check info --{checkId}':'Show details of the specified check',
    'list logs':'Show a list of all the log files available ot be read (compressed and uncompressed)',
    'more log info --{fileName}':'Show details of a specified file',
  }
  // console.log("You asked for help");
  //SHow a header fo the help page that is a wide as the screen
  cli.horizontalLine();
  cli.centered('CLI MANUAL');
  cli.horizontalLine();
  cli.verticalSpace(2);

  //Shos each command, followed by its explenation in white and yellow respectively
  for(let key in commands){
    if(commands.hasOwnProperty(key)){
      let value = commands[key];
      let = '\x1b[33m' + key + '';
    }
  }
}
//Exit
cli.responders.exit = function(){
  process.exit(0);
  // console.log("You asked for exit");
};
//Stats
cli.responders.stats = function(){
  console.log("You asked for stats");
};
//Users
cli.responders.listUsers = function(){
  console.log("You asked to list yousers");
};

// More user info
cli.responders.moreUserInfo = function(str){
  console.log("You asked for more user info",str);
};
//List checks
cli.responders.listChecks = function(str){
  console.log("You asked to list checks",str);
};
//More check info 
cli.responders.moreCheckInfo = function(str){
  console.log("You asked for more check info",str);
};
//List logs
cli.responders.listLogs = function(){
  console.log("You asked for more check info");
};
//More logs info
cli.responders.moreLogInfo = function(str){
  console.log("You asked for more log info", str);
};

//
//Input processor
cli.processInput = function(str){
  str = typeof('str') == 'string' && str.trim().length > 0 ? str.trim() : false;
  //Only process the input if the user actually wrote something. Otherwise ignore
  if(str){
    //Codify the unique strings that identify questions
    const uniqueInputs = [
      'man',
      'help',
      'exit',
      'stats',
      'list users',
      'more user info',
      'list checks',
      'more check info',
      'list logs',
      'more log info'
    ];
    //Go thought the possible inputs, emit an event when a metch is found
    let matchFound = false;
    let counter = 0;
    uniqueInputs.some(function(input){
      if(str.toLowerCase().indexOf(input) > -1){
        matchFound = true;
        //Emit an event mathing the unique input, and include the full string given
        e.emit(input,str);
        return true;
      }
    });
    //If no match is found, tell the user to try again
    if(!matchFound){
      console.log("Sorry, nonexistent input, please try again");
    }
  }
};

// //Init the prompt message 
const cliM = 'cli: '
// const cliMsg = `'\x1b[34m%s\x1b[0m' ${cliM}`  

//Init script

cli.init = function(){
  //Send the start message to the console, in dark-blue
  console.log('\x1b[34m%s\x1b[0m',`The CLI is running`);

  //Start the interface
  const _interface = readline.createInterface({
    input: process.stdin, //standard in
    output: process.stdout, //Standard out
    prompt:(`${cliM}`)
  });

  //Create an initial prompt
  _interface.prompt();

  //Handle each of input separately
  _interface.on('line',function(str){
    //Send to the input processor
    cli.processInput(str);

    //Re-initilize the prompt after words
    _interface.prompt();
    });


    //If the user stops the CLI, kill the associated process
    _interface.on('close',function(){
      process.exit(0); 
    });

  
};














module.exports = cli;

