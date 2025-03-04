const express=require("express");
const app=express();
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("get user details");
});
router.get("/:id",(req,res)=>{
    res.send("get users at :id");
});
router.post("/",(req,res)=>{
    res.send("post users")
});
router.delete("/:id",(req,res)=>{
    res.send("Delete users");
});
module.exports=router;