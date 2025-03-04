const listing=require("../models/init.js");
const Review =require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingschema, reviewschema } = require("../schema.js");
const review = require("../models/review.js");
module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
    req.session.redirectUrl=req.orginalUrl;
    req.flash("error","You must logged in it !");
    return res.redirect("/login");
 }
  next();
}
module.exports.savedUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}
module.exports.isowner=async(req,res,next)=>{
  let { id } = req.params;
    let list= await listing.findById(id);
    if(!list.owner.equals(res.locals.currentuser._id)){
        req.flash("error","You have no permission to modify the data!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.validatelisting = (req, res, next) => {
  let { error } = listingschema.validate(req.body);
  if (error) {
      let ermsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(200, ermsg);
  } else {
      next();
  }
};
module.exports.validatereview=(req,res,next)=>{
  let{error}=reviewschema.validate(req.body);
  if(error){
      let ermsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(200,ermsg);
  }else{
      next();
  }
};
module.exports.isAuthor=async(req,res,next)=>{
  let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentuser._id)){
        req.flash("error","You have no permission to modify the reviews");
        return res.redirect(`/listings/${id}`);
    }
    next();
}