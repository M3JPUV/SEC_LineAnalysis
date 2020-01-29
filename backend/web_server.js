
const WebSocket = require('ws');
var myModle = require('./LSU.js');
const wss = new WebSocket.Server({ port: 8080 });
console.log(`sever is wanting for connection`);
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    //send 
    var s;
    console.log(`Received message => ${message}`);
    //parse and stringify makes it to where this can send data across the socket
    model_data = returnModelStats(message);
    s =  JSON.stringify(model_data);
    ws.send(s);
    console.log("was sent back: " + s);
  });
});
//ZB.
function returnModelStats(r){
  //r =  recived
  //checks is data is a array
  if (Array.isArray(r)){
    //parse  makes it to where this can read data from the socket
    data = JSON.parse(r);
    //pushes the data to the Model
    return myModle.runmodel(data);
  } else{
      return ("please put a numbers or table of numbers in the form of an array ");
  }
};
//testing ZAB
/*
var data=[];
var temp =[];
var i,j;
for (i = 0;i!=6; i++){
  for (j = 0;j!=10; j++){
      temp[j] = Math.round(Math.random() * 10);
  }
  data[i] = temp;
}
console.log(data);
console.log(returnModelStats(data));
*/
