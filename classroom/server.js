const express=require("express");
const app=express();
const session=require("express-session");
const  flash = require('connect-flash');
const cookieparser=require("cookie-parser");
const users=require("./routes/users.js");
const posts=require("./routes/posts.js");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
const savedoptions={secret:"mysecretstring",resave:false,saveUninitialized:true};
app.use(cookieparser("secretcode"));
app.use(session(savedoptions));
app.use("/users",users);
app.use("/posts",posts);
app.use(flash());
app.get("/getsignedcookies",(req,res)=>{
    res.cookie("made-in","India",{signed:true})
    res.send("get cookies!")
});
app.get("/register",(req,res)=>{
    let{name="sathwik"}=req.query;
    req.session.name=name;
    if(name==="sathwik"){
        req.flash("error","not connected successfully");
    }else{
        req.flash("success","connected successfully");
    }
    // req.flash("success","connected successfully");
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.render("page.ejs",{name:req.session.name});
    // res.send(`Hello ${req.session.name}!`);
});
app.get("/test",(req,res)=>{
    res.send("tested successfully");
    // res.send(`${req.cookies}`);
});
app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`you are sending ${req.session.count}!`)
})
app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("Verified!");
});
app.get("/",(req,res)=>{
    res.send("Hi I am root");
    console.log(req.cookies);
});
app.get("/greet",(req,res)=>{
    let{name="Hello"}=req.cookies;
    res.send(`Hi ${name}!`);
})
app.get("/getcookies",(req,res)=>{
    res.cookie("Greet","Sathwik");
    res.send("successfully send cookies!");
});
app.listen(3000,()=>{
    console.log("server is working at 3000");
});