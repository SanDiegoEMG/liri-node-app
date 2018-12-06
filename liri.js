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

// var movieTitle = process.argv.slice(3).join(" ");


var command = process.argv[2]

if (command === "movie-this") {
  inquirer.prompt([
    {
      type: "input",
      name: "movieInput",
      message: "What movie you would like to know more about?"
    }
  ]).then(function (info) {
    var movieChoice = info.movieInput.replace(' ', '%20')
    console.log(movieChoice)

    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieChoice + "&y=&plot=short&apikey=trilogy";
    axios.get(movieQueryUrl).then(
      function (response) {
        console.log("Movie Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("Rotten Tomatoes says: " + response.data.Ratings[1].Value);
        console.log("IMDB says: " + response.data.Ratings[0].Value);
        console.log("Main Actors: " + response.data.Actors);
        console.log("Movie Plot: " + response.data.Plot);
        console.log("Country of Origin: " + response.data.Language);
        console.log("Movie language: " + response.data.Language);
      }
    );
  })
}

else if (command === "concert-this") {
  inquirer.prompt([
    {
      type: "confirm",
      name: "concertYN",
      message: "Would you like to see a concert?"
    }
  ]).then(function (input) {
    if (input.concertYN === true) {
      inquirer.prompt([
        {
          type: "input",
          name: "concertInput",
          message: "What artist or band would you like to see?"
        }
      ]).then(function (response) {
        var concertChoice = response.concertInput;
        console.log(concertChoice)
        var concertUrl = "https://rest.bandsintown.com/artists/" + concertChoice + "/events?app_id=codingbootcamp"

        axios.get(concertUrl).then(
          function (response) {
            var responseArr = response.data;
            if (responseArr.length >= 1) {
              console.log("Your selection " + concertChoice + " has " + responseArr.length + " shows coming up. \n Scroll down to learn about your options.");
              for (var i = 0; i < responseArr.length; i++) {
                console.log(response.data[i].venue.name + " in " + response.data[i].venue.city)
                var sepTime = (response.data[i].datetime).slice(11);
                var sepDate = (response.data[i].datetime).slice(0, 9);
                console.log(sepTime);
                console.log(sepDate);
                // var momentTime = moment(response.data[i].datetime, YYYY-MM-DD).format(MM/DD/YYYY)
                console.log("date Time = " +response.data[i].datetime);
              }
            } else {
              console.log("Sorry, currently " + concertChoice + " has no upcoming shows.")
            }

          }
        )
      })
    }
    else {
      console.log("If you don't want to see a concert, this conversation is finished.")
    };
  })
}






