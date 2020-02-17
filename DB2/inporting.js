/*
0=TN:team number
1=GP:Games Played INT
2=TOTAL:Total 1st downs INT
3=RUSH:Rushing 1st downs
4=PASS:Passing 1st downs
5=PEN:1st downs by penalty
6=TDMADE:Third Down Conversions
7=TDATT:Third Down Attempts
8=TDPCT:3rd down %
9=FDMADE:Fourth Down Conversions
10=FDATT:First Downs Attempts
11=FDPCT:4th down %
12=TPTOTAL:Total Penalties
13=YDS:Total Penalty Yards
*/
//ZB.
const rp = require('request-promise-native');
const cheerio = require("cheerio");
const fs = require('fs');
var mysql = require('mysql');
//gets the html file from the website and makes it a file
async function downloadBoxScoreHtml() {
    // where to download the HTML from
    const uri = `https://www.espn.com/college-football/stats/team/_/view/offense/stat/downs/season/2018/group/8/table/miscellaneous/sort/firstDowns/dir/desc`;
    // the output filename
    //Southeastern Conference Team Downs Stats , time so can do week here
    const filename = 'SCTDS.html';
    // download the HTML from the web server
    console.log(`Downloading HTML from ${uri}...`);
    const results = await rp({ uri: uri });
    // save the HTML to disk
    await fs.promises.writeFile(filename, results);
};
//puts the html in to a linkedlist, and reutnrs 1st index as NULL , this is "fixed" when pushing into the database
async function parseBoxScore() {
    //list of teams 
    var LOT = [];
    //team counter
    var TC = 0;
    // create a team  object based on the <td> values, team "numer" wouls change with each /\ of run.
    const team = [];
    var count= 0;
    // the input filename
    const htmlFilename = 'SCTDS.html';
    // read the HTML from disk
    const html = await fs.promises.readFile(htmlFilename);
    // parse the HTML with Cheerio
    const $ = cheerio.load(html);
    seleter = '#fittPageContainer > div.page-container.cf > div.layout.is-full > div > section > div > section > div.flex > div > div.Table__Scroller > table > tbody';
    //tells it what part of the html to grap 
    const $trs = $(seleter);
    const values = $trs.toArray().map(tr => {
      // find all children <td>, goint down if lookin at html
      const tds = $(tr).find('td').toArray();
      for (td of tds) {
        // parse the <td>
        const $td = $(td);
        count++;
        //gets the <div> under the class and then gets text
        const value = $td.text();
        team[count] = value;
        if (count == 13)
        {
          //this makes a copy , b/c team is a poiter
          let temp = JSON.parse(JSON.stringify(team));
          LOT[TC] = temp;
          //resets count ie goes to next team
          count = 0;
          //makes it fo to next team
          TC++;
        }
      }
    });
    return LOT;
  };
async function main(){
    await downloadBoxScoreHtml();
    //gets a string back  
    var FR = await fs.promises.readFile('FR.txt','utf-8');
    //console.log(typeof FR);
    //if 0 then first run(FR) of the program.
    //if there is no database in sever make one should not be if FR = 0 
    if (FR = 0) {
        //await downloadBoxScoreHtml();//gets newsest data , and saves on pc
        const DFW = await parseBoxScore();//updates the data in the program 
        //maeks a connection to the database
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "asdf"
        });
        //connections to the database
        con.connect(function (err) {
            if (err) throw err;
            con.query("use secteams", function (err, result) {
                if (err) throw err;
                console.log("useing database secteam");
                con.end();
            });
            //makes the table 
            var sql = `CREATE TABLE Teams (TN INT PRIMARY KEY,GP INT,TOTOAL INT,RUSH INT,PASS INT,PEN INT,TDMADE INT,TDATT INT,TDPCT INT,FDMADE INT,FDATT INT,FDPCT INT,TPTOTAL INT, TDS INT)`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created");
            });
            //fulls in the data
            for (i = 0; i < DFW.length; i++) {
                con.query(`INSERT INTO Teams (TN ,GP ,TOTOAL ,RUSH ,PASS ,PEN ,TDMADE ,TDATT ,TDPCT ,FDMADE ,FDATT ,FDPCT ,TPTOTAL , TDS ) VALUES ('${i}','${DFW[i][1]}','${DFW[i][2]}','${DFW[i][3]}','${DFW[i][4]}','${DFW[i][5]}','${DFW[i][6]}','${DFW[i][7]}','${DFW[i][8]}','${DFW[i][9]}','${DFW[i][10]}','${DFW[i][11]}','${DFW[i][12]}','${DFW[i][13]}');`, function (err, result) {if (err) throw err;});
            };
        });
    
        //updates RF (first one) file so this code only runs once 
        let data = 1; 
        await fs.promises.writeFile('FR.txt', data);
    }
    else {
        //should only run once a week ( use system clock on program )
        //await downloadBoxScoreHtml();//gets newsest data , and saves on pc
        const DFW = await parseBoxScore();//updates the data in the program 
        //connections to the database and gets the tabel we what  to work with.
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "asdf"
        });
        //good to go , ie if need to run and update te table
        con.connect(function (err) {
            if (err) throw err;
            con.query("use secteams", function (err, result) {
                if (err) throw err;
                console.log("useing database secteam");
                con.end();
            });
            //dont know numbers in the table to drop make and fil in 
            con.query("DROP TABLE Teams", function (err, result) {
                if (err) throw err;
                console.log("Table deleted");
            });
            //makes the table 
            var sql = `CREATE TABLE Teams (TN INT PRIMARY KEY,GP INT,TOTOAL INT,RUSH INT,PASS INT,PEN INT,TDMADE INT,TDATT INT,TDPCT INT,FDMADE INT,FDATT INT,FDPCT INT,TPTOTAL INT, TDS INT)`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created");
            });
            //fulls in the data
            for (i = 0; i < DFW.length; i++) {
                con.query(`INSERT INTO Teams (TN ,GP ,TOTOAL ,RUSH ,PASS ,PEN ,TDMADE ,TDATT ,TDPCT ,FDMADE ,FDATT ,FDPCT ,TPTOTAL , TDS ) VALUES ('${i}','${DFW[i][1]}','${DFW[i][2]}','${DFW[i][3]}','${DFW[i][4]}','${DFW[i][5]}','${DFW[i][6]}','${DFW[i][7]}','${DFW[i][8]}','${DFW[i][9]}','${DFW[i][10]}','${DFW[i][11]}','${DFW[i][12]}','${DFW[i][13]}');`, function (err, result) {if (err) throw err;});
            };
        });
    };

};
main();
