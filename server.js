const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3031;
const app = express();
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Workout = require("./models/workout.js");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:password1@ds221242.mlab.com:21242/heroku_fph29cbd", {
     useNewUrlParser: true,
     useFindAndModify: false
}).then(function(){
    return console.log("connected to mongo")
},function(err){
    console.log(err)
})

app.use(require("./routes/routes.js"));

// routes

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/exercise?", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});


app.listen(PORT,function(){ 
    console.log(`App listening on Port ${PORT}`);
});