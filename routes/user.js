const express = require("express");
const router = express.Router();
const User=require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport=require("passport");
const {savedUrl}=require("../views/middleware.js");
const usercontroller=require("../controllers/users.js");
const ExpressError=require("../utils/ExpressError.js");
router.route("/signup")
.get(usercontroller.signup)
.post(WrapAsync(usercontroller.createsignup));
router.route("/login")
.get(usercontroller.login)
.post(savedUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),usercontroller.createlogin);
router.get("/logout",usercontroller.logout);
module.exports=router;