if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const port=8080;
const path=require("path");
const flash=require("connect-flash");
const session=require("express-session");
const ejsMate=require("ejs-mate");
const methodOveride=require("method-override");
// const url='mongodb://127.0.0.1:27017/project'
const listings=require("./routes/listing.js");
const ExpressError=require("./utils/ExpressError.js");
const reviews= require('./routes/review.js');
const users=require("./routes/user.js");
const MongoStore = require('connect-mongo');
const passport=require("passport");
const localstrategy=require("passport-local");
const User=require("./models/user.js");
const url=process.env.ALTASDB_URL;
const store=MongoStore.create({
    mongoUrl:url,
    crypto: {
        secret: process.env.CRYPTO_SECRET
      },
      touchAfter: 24 * 3600
});
store.on("error",function(e){
    console.log("session store error",e);   
}
);
const savedoptions={store,secret:"mysecretstring",resave:false,saveUninitialized:true,
    cookie: {
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
}};
main()
.then(()=>{
  console.log("connected database project successfully");
})
.catch((err)=>{
    console.log(err);
});
async function  main(){
    await mongoose.connect(url);
};
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOveride("_method"));
app.use(session(savedoptions));
app.use(flash());
app.use(passport.session());
app.use(passport.initialize());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.get("/",(req,res)=>{
    res.send("working successfully")
});
app.use((req,res,next)=>{
    res.locals.msg =req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentuser=req.user;
    next();
});
// app.get("/demouser",async(req,res)=>{
//     let fakeuser=new User({
//         email:"pedapatisathwik@gmail.com",
//         username:"sathwikpedapati"
//     });
//     let registereduser=await User.register(fakeuser,"sathwi@945");
//     res.send(registereduser);
// })
// app.get("/listing",async(req,res)=>{
//     let samplelisting=new listing({
//         title:"ratnam hostel",
//         description:"hello evereeyone ratnam hostel",
//         price:150,
//         location:"chodavaram",
//         country:"india",
//     });
//      await samplelisting.save()
//     .then((res)=>{
//        console.log("saved successfully");
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
//     console.log(samplelisting);
// });
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",users);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let{statusCode=200,message="Something Went Occured!"}=err;
    res.status(statusCode).render("error.ejs",{message,statusCode});
});
app.use((err,req,res,next)=>{
    res.send("Something Went Wrong!");
});
app.listen(port,()=>{
    console.log(`server is listening at ${port}`);
 });
