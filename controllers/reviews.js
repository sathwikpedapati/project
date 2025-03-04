const listing=require("../models/init.js");
const Review=require("../models/review.js");
module.exports.creatingreview=async(req,res)=>{
    if(req.body.review){
        let list = await listing.findById(req.params.id);
        if(list){
        let newreview = await new Review(req.body.review);
        newreview.author=req.user._id;
        list.reviews.push(newreview);
        await newreview.save();
        await list.save();
        req.flash("success", "New Review Created!");
        res.redirect(`/listings`);
        }else{
            res.status(404).send("not found");
        }
    }else{
        res.status(400).send("review not found");
    }
};
module.exports.deletereview=async(req,res)=>{
    let{id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings`);
};