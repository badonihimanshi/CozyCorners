const User = require("../models/user.js");


module.exports.signupForm =(req,res)=>{
    res.render("../views/users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
        let{username, email, password}= req.body;
        let newUser = new User({email, username});
        let userRegistred = await User.register(newUser,password);
        console.log(userRegistred);
        req.login(userRegistred,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to CozyCorners");
            res.redirect("/listings");
        });

    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    };
};

module.exports.loginForm = async(req,res)=>{
    res.render("../views/users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to CozyCorners");
    let redirectUrl = res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listings");
    });
  
};