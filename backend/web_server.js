const WebSocket = require('ws');
var myModle = require('./vader.js');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`)
    model_data = returnModelStats(parseFloat(message));
    ws.send(model_data.toString());
  });
});
function returnModelStats(data){
  if (typeof data == 'number'){
      return myModle.runmodel(data);
  } else{
      return ("please but a numbers or table of numbers");
  }
};