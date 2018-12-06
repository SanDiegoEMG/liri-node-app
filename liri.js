require("dotenv").config();
var inquirer = require("inquirer");
var spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require('axios');


// import the keys.js file and store it in a variable.
var fs = require("fs");

fs.readFile("./keys.js", "utf8", function (error, data) {
  if (error) {
    return console.log(error);   // If the code experiences any errors it will log the error to the console.
  }
});

var command = process.argv[2]


if (command === "movie-this") {

  var movieTitle = process.argv.slice(3).join(" ");
  var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

  axios.get(movieQueryUrl).then(
    function (response) {

      console.log("Movie Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
    }
  );
}



