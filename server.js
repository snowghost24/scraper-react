const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
var request = require('request');
var cheerio = require('cheerio');
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));



var db = require("./models")

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
if (process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI)
}else{
    mongoose.connect("mongodb://localhost/scraperdb", {
        useMongoClient: true
    })
}




// ________________________MY SCRAP REQUEST____________________________________________

// app.get("/scraper", function (req, res) {


//     var numSet = 0;
    
//     request("http://snowboarding.transworld.net/videos/#hjiHOhvH2fvmmWup.97", function (error, response, html) {

//         var $ = cheerio.load(html);

//         var results = {};

       

//         $(".entry-title").each(function (i, element) {

//             numSet++;
//             results.title = $(this).children("a").attr("title")
            
//                         results.link = $(this).children("a").attr("href")


//             if (results.title && results.link ) {

//                 db.Article.create(results)
                
                

//             }

            
            
//         })

//        res.send("Newly scrapped articles!")

//     })
    
// })

// ___________________________________END MY SCRAPE _____________


// ______________________START ROUTES___________________

app.get("/scrape/articles", function (req, res) {
    db.Article
    .find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}) // End of "/"___________


app.post("/save/:id", function (req, res) {

    var id = req.params.id;

    var resObj = {}
    db.Article.findOne({
            _id: id
        })
        .then(function (foundOne) {

            resObj.title = foundOne.title;
            resObj.link = foundOne.link;
            resObj.summary = foundOne.summary;

            db.SavedArticle.create(resObj)

            db.Article.findOneAndRemove({
                _id: id
            }, function (err, homeDelete) {
                if (err) {
                    console.log(err);
                }
                res.redirect("/scraper")
            })
        })


}) // End of "/save/:id"___________

app.get("/savings", function (req, res) {
   
    db.SavedArticle.find({})
    .populate("note")
    .exec(function(err, data){
         res.json(data)
        }).catch(err => res.status(422).json(err));

}) // End of "/saved"___________

// delete saved articles
app.get("/delete/:id", function (req, res) {

    var id2 = req.params.id;

    db.SavedArticle.findOneAndRemove({
        _id: id2
    }, function (err, foundDelete) {

        if (err) {
            console.log(err);
        }
        res.send("Newly scrapped articles!")
    })

}) // End of "/delete/:id"___________


app.get("/addnote/:note", function(req, res){

var array = req.params.note.split(",");

var getNote = {
    
   body: array[0]

}
console.log(array[1]);
    db.Note.create(getNote, function(err, made){
            if (err){
               throw err;
            }

        db.SavedArticle.findOneAndUpdate({ _id : array[1]}, { $push: { "note": made._id }} , { new: true }, function(error, update){
            if (err){
                throw err;
            }
            console.log(update);
            res.send(update)

        })
    })
})

app.get("/deleteNote/:id", function(req, res){

    db.Note.findOneAndRemove({_id : req.params.id}, function(err, delNote){
        if (err){
            throw err;
        }

    res.send(delNote)
    })
})// End of "/deleteNote/:id"___________


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
