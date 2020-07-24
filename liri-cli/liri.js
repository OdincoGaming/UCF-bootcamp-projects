require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//============================================================================
//============================================================================
var action = process.argv[2];
var nodeArgs = process.argv;
var target;
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        target = target + "+" + nodeArgs[i];
    } else {
        target = nodeArgs[i];
    }
}
//============================================================================
//============================================================================
switch(action){
    case "concert-this":
        concertThis(target);
        break;
    case "spotify-this":
        spotifyThis(target);
        break;
    case "movie-this":
        movieThis(target);
        break;
    case "do-what-it-says":
        doThis();
        break;
}
//============================================================================
//============================================================================
async function concertThis(target){
    var queryUrl = "https://rest.bandsintown.com/artists/" + target + "/events?app_id=codingbootcamp";
    await axRequest(queryUrl).then((response)=>{
        var concert = response.data[0];
        var venue = concert.venue.name;
        var venueLocation = concert.venue.city;
        var date = moment(concert.datetime).format("dddd, MMMM Do YYYY, h:mm");  
        var concertObj = {
            venue: venue,
            location: venueLocation,
            date: date.toString()
        };
        console.log(concertObj);
        fs.appendFile("log.txt", "\n" + JSON.stringify(concertObj) + "\n---------\n---------", function(error) {
            if (error) {
                return console.log(err);
            }
        });
    });
}
//============================================================================
//============================================================================
function spotifyThis(target){
    if(target == "" || target == null){
        target = "The sign";
    }
    spotify.search({ type: 'track', query: target }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let songs = data.tracks.items;
        var songName = songs[0].name;
        var previewURL = songs[0].preview_url;
        var album = songs[0].album.name;
        var artists = [];
        let numArtists = songs[0].artists.length;
        for(var j = 0; j < numArtists; j++){
            artists.push(songs[0].artists[j].name);
        }
        var songData = {
            artist: artists,
            album: album,
            name: songName,
            link: previewURL
        }
        console.log(songData);
        fs.appendFile("log.txt", "\n" + JSON.stringify(songData) + "\n---------\n---------", function(error) {
            if (error) {
                return console.log(err);
            }
        });
    });
}
//============================================================================
//============================================================================
async function movieThis(target){
    var queryUrl = "http://www.omdbapi.com/?t=" + target + "&y=&plot=short&apikey=trilogy";
    await axRequest(queryUrl).then((response)=>{
        var movie = response.data;
        var title = movie.Title;
        var year = movie.Year;
        var rating = movie.Rated;
        var tomatoes = movie.Ratings;
        var country = movie.Country;
        var language = movie.Language;
        var plot = movie.Plot;
        var actors = movie.Actors;
        var movieObj = {
            title: title,
            year: year,
            rating: rating,
            tomatoes: tomatoes,
            country: country,
            language: language,
            plot: plot,
            actors: actors
        }
        console.log(movieObj);
        fs.appendFile("log.txt", "\n" + JSON.stringify(movieObj) + "\n---------\n---------", function(error) {
            if (error) {
                return console.log(err);
            }
        });
    });
}
//============================================================================
//============================================================================
function doThis(){
    var actionR;
    var targetR;

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        actionR = dataArr[0];
        targetR = dataArr[1];
        switch(actionR){
            case "concert-this":
                concertThis(targetR);
                break;
            case "spotify-this":
                spotifyThis(targetR);
                break;
            case "movie-this":
                movieThis(targetR);
                break;
        }
    });
}
//============================================================================
//============================================================================
function axRequest(queryUrl){
    return new Promise((resolve,reject)=>{
        axios.get(queryUrl).then(function(response) {
            resolve(response);
        }).catch(function(error) {
            reject(error);
        })
    });
}