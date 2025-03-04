const express=require("express");
const router=express.Router({mergeParams:true});
const WrapAsync=require("../utils/WrapAsync.js");
const reviewcontroller=require("../controllers/reviews.js")
const{validatereview,isloggedin,isAuthor}=require("../views/middleware.js");
router.post("/",validatereview,isloggedin,WrapAsync(reviewcontroller.creatingreview));
router.delete("/:reviewId",isAuthor,isloggedin,WrapAsync(reviewcontroller.deletereview));
module.exports=router;