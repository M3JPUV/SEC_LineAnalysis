/*
0=TN:team number
1=GP:Games Played INT
2=TOTAL:Total 1st downs INT
3=RUSH:Rushing 1st downs
4=PASS:Passing 1st downs
5=PEN:1st downs by penalty
6=MADE:Third Down Conversions
7=TDATT:Third Down Attempts
8=PCT:3rd down %
9=MADE:Fourth Down Conversions
10=FDATT:First Downs Attempts
11=PCT:4th down %
12=TPTOTAL:Total Penalties
13=YDS:Total Penalty Yards
*/
//ZB.
const rp = require('request-promise-native');
const cheerio = require("cheerio");
const fs = require('fs');
var mysql = require('mysql');
//return 0 if not been a week , if over a week returns 1 
async function checkdate() {
    var today = new Date();
    //data from file (dataFF), reads from file
    const dataFF = await fs.promises.readFile('Date.txt', 'utf-8');
    //check date
    //console.log(dataFF);
    //onlh gets date.
    //console.log(today.getDate());
    var CD = dataFF.split("-");
    //if been a week update date file with new date.
    if ((today.getDate() - CD[2]) >= 7) {
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let data = date;
        //wrties to file   
        await fs.promises.writeFile('Date.txt', data);
        return 1;
    }
    return 0;
};
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
//puts the html in to a linkedlist
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
        // 1st value is team 
        team[count] = count;
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
    const FR = await fs.promises.readFile('FR','utf-8');
    if (FR = 0) {
        //if there is no database in sever make one 
        con.connect(function (err) {
            con.query("CREATE DATABASE secTEAM", function (err, result) {
                if (err) throw err;
                console.log("Database created");
            });
            var sql = "CREATE TABLE Teams (TN VARCHAR(25),GP INT,TOTOAL INT,RUSH INT,PASS INT,PEN INT,MADE INT,TDATT INT,PCT INT,MADE INT,FDATT INT,PCT INT,TPTOTAL INT, TDS INT))";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created");
            });
            //gets "freah" data from a website to full in table 
            const DFW = await parseBoxScore();
            for (i = 0; i < DFW.length; i++) {
                con.query(`INSERT INTO Teams (TN ,GP ,TOTOAL ,RUSH ,PASS ,PEN ,MADE ,TDATT ,PCT ,MADE ,FDATT ,PCT ,TPTOTAL , TDS ) VALUES ('${DFW[i][0]}','${DFW[i][1]}','${DFW[i][2]}','${DFW[i][3]}','${DFW[i][4]}','${DFW[i][5]}','${DFW[i][6]}','${DFW[i][7]}','${DFW[i][8]}','${DFW[i][9]}','${DFW[i][10]}','${DFW[i][11]}','${DFW[i][12]}','${DFW[i][13]}');`, function (err, result) {});
            };
        });
        //updates RF (first one) file so this code only runs once 
        let data = 1; 
        await fs.promises.writeFile('FR.txt', data);
    }
    else {
        //good to go , ie if need to run and update te table
        var GTG = await checkdate();
        if (GTG == 1) {
            await downloadBoxScoreHtml();
        }
        // data from html
        const DFW = await parseBoxScore();
        //console.log(DFW[1][1]);
        //TODO and test : get data into database
        //TODO , needs a name
        con.connect(function (err) {
            for (i = 0; i < DFW.length; i++) {
                con.query(`INSERT INTO Teams (TN, GP ,TOTOAL ,RUSH ,PASS ,PEN ,MADE ,TDATT ,PCT ,MADE ,FDATT ,PCT ,TPTOTAL , TDS ) VALUES ('${DFW[i][0]}','${DFW[i][1]}','${DFW[i][2]}','${DFW[i][3]}','${DFW[i][4]}','${DFW[i][5]}','${DFW[i][6]}','${DFW[i][7]}','${DFW[i][8]}','${DFW[i][9]}','${DFW[i][10]}','${DFW[i][11]}','${DFW[i][12]}','${DFW[i][13]}');`, function (err, result) {});
            };
        });
    };

};
var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword",
    database: "secTEAMS"
});
main();