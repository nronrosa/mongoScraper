# mongoScraper

### Overview of Project
A web app that lets users view and leave comments on the latest news. These articles are not written or saved they are scraped news from another site using Mongoose and Cheerio muscles.

### Demo 
* Interact with completed app [demo](xxx).
![Image](/public/assets/images/mongoScraper.png)

### What this project uses
This project uses Nodejs, JavaScript, HTML, CSS, JQuery, Express, JSON, MySQL, Handlebars, NPM packages, mongoose, cheerio, axios and deployed to Heroku.

### How it functions
   * Whenever a user visits the site, the app should scrape stories from a news outlet and display them. Each scraped article should be saved to your application database. 

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

     * Created - date article scraped
     
     * Article Time - time of article 
     
   * Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.
   
### How to use
To run application in your browser, first set the port environment.
Type in terminal command line: ```node server.js```
