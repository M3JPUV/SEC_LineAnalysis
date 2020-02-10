
/* this is what i get from the website , need it to be a tabel to plug in.
0=GP:Games Played INT
1=TOTAL:Total 1st downs INT
2=RUSH:Rushing 1st downs
3=PASS:Passing 1st downs
4=PEN:1st downs by penalty
5=MADE:Third Down Conversions
6=ATT:Third Down Attempts
7=PCT:3rd down %
8=MADE:Fourth Down Conversions
9=ATT:First Downs Attempts
10=PCT:4th down %
11=TOTAL:Total Penalties
12=YDS:Total Penalty Yards
*/
//ZB.
const rp = require('request-promise-native');
const cheerio = require("cheerio");
const fs = require('fs');
//return 0 if not been a week , if over a week returns 1 
async function checkdate(){
  var today = new Date();
  //data from file (dataFF), reads from file
  const dataFF = await fs.promises.readFile('Date.txt','utf-8');
  //check date
  //console.log(dataFF);
  //onlh gets date.
  //console.log(today.getDate());
  var CD = dataFF.split("-");
  //if been a week update date file with new date.
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
    // find all children <td>
    const tds = $(tr).find('td').toArray();
    for (td of tds) {
      // parse the <td>
      const $td = $(td);
      // 1st value is team 
      team[count] = count;
      count++;
      //TODO: if no keys are wanted remove above.
      //gets the div under the class and then gets text
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
  //good ot go , ie if need to run and update te table
  var GTG =  await checkdate();
  if (GTG == 1){
    await downloadBoxScoreHtml();
  }
  // data from html
  const DFW = await parseBoxScore();
  console.log(DFW[1][1]);
  console.log(DFW[0][13])
  console.log(DFW.length);
  //push to database from here\/
  //TODO : get data into database
};
main();
