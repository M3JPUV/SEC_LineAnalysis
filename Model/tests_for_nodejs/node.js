/*
let {PythonShell} = require('python-shell')

let options = {
  mode: 'text',
  //pythonPath: 'path/to/python',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: 'home/lsasecfe/SEC_LineAnalysis/Model/tests_for_nodejs',
};

PythonShell.run('test.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log('results: %j', results);
});
*/
let {PythonShell} = require('python-shell')
let pyshell = new PythonShell('test.py');
// sends a message to the Python script via stdin
#pyshell.send('hello');

pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message);
});
// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
});
