const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// Routes
// =============================================================

// HTML Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/survey.html"));
});

// API Routes
app.get("/api/friends", function(req, res) {
    res = ReadFriends();
    return res.json();
});

app.post("/api/characters", function(req, res) {
    WriteFriends(req.body);
    res.json(req.body);
});

// Utilities
// =============================================================

function ReadFriends(){
    fs.readFile('/data/friends.json', (err, data) => {
        if (err) throw err;
        let friends = JSON.parse(data);
        return friends;
    });
}

function WriteFriends(newJSON){
    fs.writeFile('/data/friends.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

