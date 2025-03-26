const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport"); 
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/users.js");

router
 .route("/signup")
 .get( userControllers.signupForm)
 .post(wrapAsync(userControllers.signup));


router.route("/login")
.get( userControllers.loginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}), userControllers.login);

router.get("/logout",userControllers.logout);


module.exports= router;