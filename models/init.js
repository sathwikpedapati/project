const mongoose=require("mongoose");
const Review =require("./review.js")
const User=require("./user.js");
const listing=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
       url:String,
       filename:String
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    coordinates:{
        type:[Number],
        required:true
    }

});
listing.post("findOneAndDelete", async(listing)=>{
    if(list){
        await Review.deleteMany({_id:{ $in :list.reviews}});
    }
});
const list =mongoose.model("list",listing);
module.exports=list;