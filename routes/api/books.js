const router = require("express").Router();
const booksController = require("../../controllers/booksController");
var db = require("../../models")
// Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);


//________________________MY SCRAP REQUEST____________________________________________

router.route("/scraper").get( function (req, res) {
  var numSet = 0;
  request("http://snowboarding.transworld.net/videos/#hjiHOhvH2fvmmWup.97", function (error, response, html) {

      var $ = cheerio.load(html);

      var results = {};

     

      $(".hentry").each(function (i, element) {

          numSet++;
          results.title = $(this).children("a").attr("title")
          
                      results.link = $(this).children("a").attr("href")


          if (results.title && results.link ) {

              db.Article.create(results)
              
              

          }

          
          
      })

     res.send("Newly scrapped articles!")

  })
  
})

// ___________________________________END MY SCRAPE _____________


// ______________________START ROUTES___________________

router.route("/scrape/articles").get( function (req, res) {
  db.Article
  .find({})
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
}) // End of "/"___________


router.route("/save/:id").post(function (req, res) {

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

router.route("/savings").get( function (req, res) {
 
  db.SavedArticle.find({})
  .populate("note")
  .exec(function(err, data){
       res.json(data)
      }).catch(err => res.status(422).json(err));

}) // End of "/saved"___________

// delete saved articles
router.route("/delete/:id").get( function (req, res) {
console.log("Im in delete");
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


router.route("/addnote/:note").get(function(req, res){

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

router.route("/deleteNote/:id").get( function(req, res){

  db.Note.findOneAndRemove({_id : req.params.id}, function(err, delNote){
      if (err){
          throw err;
      }

  res.send(delNote)
  })
})// End of "/deleteNote/:id"___________



module.exports = router;
