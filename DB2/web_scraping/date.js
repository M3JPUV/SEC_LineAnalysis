
const fs = require('fs')   
// Data which will write in a file. 
//return 0 if not been a week , if over a week returns 1 
async function checkdate(){
    var today = new Date();
    //data from file (dataFF), reads from file
    const dataFF = await fs.promises.readFile('Date.txt','utf-8');
    //check date
    console.log(dataFF);
    //onlh gets date.
    console.log(today.getDate());
    var CD = dataFF.split("-");
    //if been a week update date file and the in turn updates the database.
    if ((today.getDate() - CD[2]) >= 7 )
    {
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let data = date;
        //wrties to file   
        await fs.promises.writeFile('Date.txt', data);
        return 1;
    }
    return 0;
} 
async function main(){
   var GTG =  await checkdate();
   console.log(GTG);
}
main();