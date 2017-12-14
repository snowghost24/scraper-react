const router = require("express").Router();
const bookRoutes = require("./books");

// Book routes
router.use("/books", bookRoutes);
// router.route("/").get(booksController.findAll)
  








module.exports = router;
