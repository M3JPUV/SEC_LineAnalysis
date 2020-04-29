
let usemodel = require("./node.js").usermodel;
const fs = require('fs');
usemodel('Def_%_of_Passes_w/_INT','LSU','Georgia_Southern');
//have to 'wait' to the file to be made/ updated
setTimeout(() => {
//this all runs after a sec{ ie 1000 ms}
let v = fs.readFileSync('temp.json');
let json = JSON.parse(v);
console.log(json);
console.log(typeof json);
},455);

