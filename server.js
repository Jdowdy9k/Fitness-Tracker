const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3030;
const app = express();
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Workout = require("./models/workout");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });

app.use(require("./routes/apiRoutes"));
app.use(require("./routes/htmlRoutes"));


// routes
//app.use(require("./routes/routes.js"));

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