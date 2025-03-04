const User=require("../models/user.js");
module.exports.signup=(req,res)=>{
    res.render("users/user.ejs");
   };
module.exports.createsignup=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        const newuser=  new User({email,username}); 
        const registereduser=await User.register(newuser,password);
        req.login(registereduser,(err)=>{
            if(err){ 
                return next(new ExpressError("Cannot Login",500));
            }
            req.flash("success","Welcome to TravelWebsite");
            res.redirect("/listings");
    });
} catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};
module.exports.login=(req,res)=>{
    res.render("users/login.ejs");
};
module.exports.createlogin=async(req,res)=>{
    req.flash("success","Welcome back to Bookings Slot!");
    let redirect=res.locals.redirectUrl||"/listings";
    res.redirect(redirect);
};
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged Out!");
        res.redirect("/listings");
    })
};