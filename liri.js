require("dotenv").config();
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require('axios');


// import the keys.js file and store it in a variable.
var fs = require("fs");

// fs.readFile("./keys.js", "utf8", function (error, data) {
//   if (error) {
//     return console.log(error);   // If the code experiences any errors it will log the error to the console.
//   }
//   else {
//     console.log(data);
//   }
// });



var command = process.argv[2]

// movie call
if (command === "movie-this") {
  inquirer.prompt([
    {
      type: "input",
      name: "movieInput",
      message: "What movie you would like to know more about?"
    }
  ]).then(function (info) {
    var movieChoice = info.movieInput
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieChoice + "&y=&plot=short&apikey=trilogy";

    axios.get(movieQueryUrl).then(
      function (response) {
        console.log("\nMovie Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        var ratings = (response.data.Ratings).length;
        if (ratings > 2 == true) {
          console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
          console.log("IMDB rating: " + response.data.Ratings[0].Value);
          console.log("Main Actors: " + response.data.Actors);
          console.log("Movie Plot: " + response.data.Plot);
          console.log("Country of Origin: " + response.data.Language);
          console.log("Movie language: " + response.data.Language + "\n");
        } else {
          console.log("IMDB rating: " + response.data.Ratings[0].Value);
          console.log("Main Actors: " + response.data.Actors);
          console.log("Movie Plot: " + response.data.Plot);
          console.log("Country of Origin: " + response.data.Country);
          console.log("Movie language: " + response.data.Language + "\n");
        }
      }
    );
  })
}
// concert call
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
        // console.log(concertChoice)
        var concertUrl = "https://rest.bandsintown.com/artists/" + concertChoice + "/events?app_id=codingbootcamp"

        axios.get(concertUrl).then(
          function (response) {
            var responseArr = response.data;
            if (responseArr.length >= 1) {
              console.log("\n Your selection " + concertChoice + " has " + responseArr.length + " shows coming up. \n Scroll down to learn about your options." + "\n");
              for (var i = 0; i < responseArr.length; i++) {

                // process for isolating date and time info  information
                var useIndex = (response.data[i].datetime).indexOf("T");
                var sepTime = (response.data[i].datetime).slice(useIndex + 1);
                var sepDate = (response.data[i].datetime).slice(0, useIndex);
                // using moment for formatinng 
                var momentDate = moment(sepDate, "YYYY-MM-DD").format("MM/DD/YYYY")
                var momentTime = moment(sepTime, "HH:mm:ss").format("hh:mm a")

                // formatted output
                console.log("Where: " + response.data[i].venue.name + " in " + response.data[i].venue.city)
                console.log("On " + momentDate + " at " + momentTime + "\n");
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




if (command === "spotify-this-song") {
  inquirer.prompt([
    {
      type: "input",
      name: "spotifyInput",
      message: "What song are you curious about?"
    }
  ]).then(function (info) {

    var spotifyChoice = info.spotifyInput;

    var spotify = new Spotify({
      id: "28736ad86ddf4fbaa38b131c137ddcd0",
      secret: "77183f78d25d496c8d45b94e68956608"
    });

    spotify.search({ type: 'track', query: spotifyChoice, limit: "5" })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  })
};



// var getSpot = require("./keys.js");
// console.log (getSpot.id)
