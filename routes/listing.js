const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const {isloggedin,isowner,validatelisting}=require("../views/middleware.js");
const listingcontroller=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloundinaryconfig.js");
const upload = multer({ storage })
router
.route("/")
.get(WrapAsync(listingcontroller.index))
.post(isloggedin,upload.single("listing[image]"),WrapAsync(listingcontroller.post));
router.get("/new", isloggedin ,listingcontroller.new);
router
.route("/:id")
.get( WrapAsync(listingcontroller.create))
.put(isowner,isloggedin,upload.single("listing[image]"),WrapAsync(listingcontroller.updating))
.delete(isowner,isloggedin,WrapAsync(listingcontroller.deletelisting));
router.get("/:id/edit",isloggedin,isowner, WrapAsync(listingcontroller.editlisting));
module.exports = router;
