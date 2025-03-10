const express=require("express");
const router=express.Router();
const asyncWrap=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js")
const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middlewares.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});


router
.route("/")
.get(asyncWrap(listingController.index))
 .post(isLoggedIn,
    upload.single('listing[image]'),
    asyncWrap(listingController.createListing));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//filter route
router.get("/filter",asyncWrap(listingController.filterCategory));

//search route
router.get("/search",asyncWrap(listingController.searchListing));


router
.route("/:id")
.get(asyncWrap(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),asyncWrap(listingController.updateListing))
.delete(isLoggedIn,isOwner,asyncWrap(listingController.deletListing));



//edit route
router.get("/:id/edit",isLoggedIn,isOwner,asyncWrap(listingController.renderEditForm));


module.exports=router;