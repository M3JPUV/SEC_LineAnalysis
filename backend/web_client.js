const WebSocket = require('ws');
const fs = require('fs');
function runnewmodel(table){
    var DFM;
    const url = 'ws://138.47.138.96:8080';
    const connection = new WebSocket(url);
    connection.onopen = () => {
    connection.send(table);
    };

    connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
    };

    connection.onmessage = (e) => {
        console.log("Inside the loop, " + e.data)
        connection.close();
        fs.writeFile('modeldata.txt', e.data, (err) => {
            if (err) throw err;
            console.log("data modeldata saved");
        });
        return DFM;
    };
};
/*
//Creates arrays within an array and calls it data.
var data=[];
var temp =[];
var i,j,d;
for (i = 0;i!=100; i++){    //Create 100 arrays
  for (j = 0;j!=1000; j++){ //with 1000 numbers each.
      temp[j] = Math.round(Math.random() * 10);
  }
  data[i] = temp;
}

//Turns the data array into a string to be parsed by the server.
d = 'JSON.stringify(data);';
*/
var dataFM = runnewmodel(d);

