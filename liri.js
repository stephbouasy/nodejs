require("dotenv").config();

var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);

switch (new Date().getDay()) {
    case 0:
        day = "Concert";
        break;
    case 1:
        day = "Spotify";
        break;
    case 2:
        day = "Movie";
        break;
    case 3:
        day = "Do What It Says";
        break;
}
