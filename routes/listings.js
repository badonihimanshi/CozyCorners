const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingControllers = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});


router
 .route("/")
 .get( wrapAsync(listingControllers.index))
 .post(
   isLoggedIn,
   upload.single('listing[image]'),
   validateListing,
   wrapAsync(listingControllers.createListings),
);
// .post(upload.single("listing[image]"),(req,res)=>{
//   res.send(req.file);
// });


//New Route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

router
 .route("/:id")
 .get( wrapAsync(listingControllers.showListings))
 .put(
   isLoggedIn, 
   isOwner, 
   upload.single('listing[image]'),
   validateListing,
   wrapAsync(listingControllers.update)
  )
 .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.destroyListing));


//Edit Route
router.get("/:id/edit",
  isLoggedIn,
  isOwner, 
  wrapAsync(listingControllers.renderEditForm));
 

module.exports = router;