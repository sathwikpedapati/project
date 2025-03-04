
const listing= require("../models/init.js");

module.exports.index=async (req, res) => {
    let alllisting = await listing.find({});
    res.render("index.ejs", { alllisting });
};
module.exports.new=async(req, res) => {
    if(!req.isAuthenticated()){
       req.flash("error","You must logged in it !");
       return res.redirect("/login");
    }
    res.render("new.ejs");
};
module.exports.post= async(req, res, next) => {
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename);
    let address= await req.body.listing.location;
    let newlisting = new listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};
    await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            console.error("Error: No location found");
            return;
        }
        newlisting.coordinates=[data[0].lat,data[0].lon];
    });
    await newlisting.save();
    // console.log(newlisting);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};
module.exports.create=async (req, res) => {
    let { id } = req.params;
    let lf = await listing.findById(id).populate({path:"reviews",populate:{
        path:"author"}}).populate("owner");
    if(!lf){
        req.flash("error","listing is not found");
        res.redirect("/listings");
    }
    res.render("show.ejs", { lf });
};
module.exports.editlisting=async (req, res) => {
    let { id } = req.params;
    const list = await listing.findById(id);
    if(!list){
        req.flash("error","listing is not found");
        res.redirect("/listings");
    }
    let orginalimage=list.image.url;
    res.render("edit.ejs", { list ,orginalimage});
};
module.exports.updating= async(req, res) => {
    let { id } = req.params;
    let list= await listing.findById(id);
    if(!list.owner.equals(res.locals.currentuser._id)){
        req.flash("error","You have no permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    let lf = await listing.findByIdAndUpdate(id,{ ...req.body.listing});
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        lf.image={url,filename};
        await lf.save();
    }   
    req.flash("success", "Listing Updated");
    res.redirect(`/listings`);
};
module.exports.deletelisting=async (req, res, next) => {
    let { id } = req.params;
    let deletelisting = await listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect(`/listings`);
};