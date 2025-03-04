const express=require("express");
const app=express();
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("get posts details");
});
router.get("/:id",(req,res)=>{
    res.send("get posts at :id");
});
router.post("/",(req,res)=>{
    res.send("post posts")
});
router.delete("/:id",(req,res)=>{
    res.send("Delete posts");
});
module.exports=router;