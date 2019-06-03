var mongoose = require("mongoose");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = function (app) {

    //GET requests to render Handlebars pages
    // Render home/index
    app.get("/", function (req, res) {
        db.Article.find({
            "saved": false
        }, function (error, data) {
            var hbsObject = {
                article: data
            };
            res.render("index", hbsObject);
        });
    });

    // Render Saved page
    app.get("/saved", function (req, res) {
        db.Article.find({
                saved: true
            }).populate("notes")
            .exec(function (error, articles) {
                var hbsObject = {
                    article: articles
                };
                res.render("saved", hbsObject);
            });
    });

    // A GET route for scraping the website
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://www.elnuevodia.com/ultimas-noticias/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $(".story-tease-beta").each(function (i, element) {
                // Save an empty result object
                var result = {};
                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).find(".story-tease-title").text();
                result.link = "https://www.elnuevodia.com" + $(this).find("a").attr("href");
                result.summary = $(this).find(".story-tease-summary").text();
                result.articleTime = $(this).find(".story-tease-date").text();
                // Create a new Article using the `result` object built from scraping
                console.log(result);

                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });

            // Send a message to the client
            res.send("Scrape Complete");
        });
    });

    // Route for getting all Articles from the db
    app.get("/articles", function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({}).sort({
                created: -1
            })
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Save an article
    app.put("/article/save/:id", function (req, res) {
        // Find the article id and update its saved boolean
        var id = req.params.id;
        db.Article.findOneAndUpdate({
                _id: id
            }, {
                "saved": true
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                console.log(dbArticle);
                // res.render("/", dbArticle);
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Delete an article from saved
    app.post("/articles/delete/:id", function (req, res) {
        // Use the article id to find and update its saved boolean
        db.Article.findOneAndUpdate({
                "_id": req.params.id
            }, {
                "saved": false,
                "notes": []
            })
            // Execute the above query
            .then(function (dbArticle) {
                // If we were able to successfully delete an Article
                // alert("article deleted");
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // clear all articles from database
    app.get("/article/clear", function (req, res) {
        console.log(req.body)
        db.Article.deleteMany({})
            .then(function (dbArticle) {
                // res.json(dbArticle);
                res.render("/");
            })
            .catch(function (err) {
                res.json(err);
            });
        res.send(true)
    });


// ARTICLES NOTES
    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({
                _id: req.params.id
            })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        console.log(req.body)
        console.log("***********************");


        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate(
                    { _id: req.params.id },
                    { $push: { note: dbNote._id } },
                    { new: true }


                //     _id: req.params.id
                // }, {
                //     note: dbNote._id
                // }, {
                //     new: true
                // }, {
                //     $push: {
                //         notes: req.body.note
                //     }
                );
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client]
                console.log(dbArticle);
                console.log(dbNote);
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });







};