import axios from 'axios';
//Matthew Tures
//
//This script will be used to hit an API and returns all the game data for a season



//The array of data to return at the end of the script
var gameData = [];

//gameData.push("Something"); will add to the array


axios.get("https://api.collegefootballdata.com/games?year=2019&week=1&seasonType=regular").then(res => {
   data = res.data
   gameData.push(data)
})


console.log(gameData);