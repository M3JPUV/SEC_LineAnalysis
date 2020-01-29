const WebSocket = require('ws');
const fs = require('fs');
function runnewmodel(table){
    var DFM;
    const url = 'ws://192.168.1.13:8080';
    const connection = new WebSocket(url);
    connection.onopen = () => {
    connection.send(table);
    };

    connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
    };

    connection.onmessage = (e) => {
        console.log("indise the loop " + e.data)
        connection.close();
        fs.writeFile('modeldata.txt', e.data, (err) => {
            if (err) throw err;
            console.log("data modeldata svaed");
        });
        return DFM;
    };
};
var dataFM = runnewmodel(40);

