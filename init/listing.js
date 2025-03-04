const mongoose=require("mongoose");
const listing=require("./data.js");
const list =require("../models/init.js")
const url='mongodb://127.0.0.1:27017/project';
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
const initdb = async ()=>{
   await list.deleteMany({});
   listing.data=listing.data.map((obj)=>({...obj,owner:"67aa372acc6c94e025e5a6f3"}));
    await list.insertMany(listing.data);
   console.log("data connection");
};
initdb();