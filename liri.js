require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var userOption = process.argv[2];
var inputParameter = process.argv[3];

UserInputs(userOption, inputParameter);

function UserInputs(userOption, inputParameter) {
    switch (userOption) {
        case "concert-this":
            showConcertInfo(inputParameter);
            break;
        case "spotify-this-song":
            showSongInfo(inputParameter);
            break;
        case "movie-this":
            showMovieInfo(inputParameter);
            break;
        case "do-what-it-says":
            showInfo();
            break;
        default:
            console.log("Error.")
    }
}

var getArtistNames = function (artist) {
    return artist.name;
};

function showConcertInfo(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("Concert Info: ");
                fs.appendFileSync("log.txt.", "Concert Info:\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                console.log("Name of the venue: " + concerts[i].venue.name + "\n");
                console.log("Venue Location: " + concerts[i].venue.city);
                fs.appendFileSync("log.txt", "Venue Location: " + concerts[i].venue.city + "\n");
                console.log("-----------------------------------");
                fs.appendFileSync("log.txt", "------------" + "\n");
            }
        } else {
            console.log("error")
        }
    });
}


function showSongInfo(songName) {
    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;
            //console.log(songs);
            for (var i = 0; i < songs.length; i++) {
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
}


function showMovieInfo(movie) {
    return data.info.find(function (item) {
        return item.Source === "IMDB";
    });
}

function showInfo(data) {
    return data.info.find(function (item) {
        return item.Source === "";
    });
}




