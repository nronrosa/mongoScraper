var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3005;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/mongoScraper", {
//     useNewUrlParser: true
// });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app)

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});