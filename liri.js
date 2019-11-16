require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var spotify = new spotify(keys.spotify);

var userOption = process.argv[2];
var inputParameter = process.argv[3];

UserInputs(userOption, inputParameter);

function UserInput(userOption, inputParameter) {
    switch (userOption) {
        case "concert-this":
            showConcertInfo(inputParameter);
            break;
        case "spotify-this-song":
            showSongInfo(inputParameter);
            break;
        case "movie-this":
            showMovieInfor(inputParameter);
            break;
        case "do-what-it-says":
            showInfo();
            break;
        default:
            console.log("Error.")
    }
}

function getRottenTomatoesRatingObject(data) {
    return data.Ratings.find(function (item) {
        return item.Source === "Rotten Tomatoes";
    });
}
function getRottenTomatoesRatingValue(data) {
    return getRottenTomatoesRatingObject(data).Value;
};

function showInfo() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
    });
}


