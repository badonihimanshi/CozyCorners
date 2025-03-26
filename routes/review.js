const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isAuthor} = require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/reviews.js");
const reviewControllers = require("../controllers/reviews.js");

// Post
router.post("/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewControllers.createReview));
  

//DELETE Review Route  
router.delete("/:reviewId",
  isLoggedIn,
  isAuthor,
    wrapAsync(reviewControllers.destroyReview)
);

module.exports = router;