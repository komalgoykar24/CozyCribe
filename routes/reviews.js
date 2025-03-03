const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review=require("../models/reviews.js");
const ExpressError=require("../utils/ExpressError.js")
const {reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const reviewController=require("../controllers/reviews.js");

const {validateReview, isLoggedIn, isReviewAuthor}=require("../middlewares.js");





//Reviews
//Post review Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createRoute));
  
  //Delete review route
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));
  
 module.exports=router;