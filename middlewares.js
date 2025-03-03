const Listing=require("./models/listing")
const Review=require("./models/reviews.js")
const listingSchema=require("../MAJORPROJECT/schema.js");
const reviewSchema=require("./models/reviews.js")


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must logged in Firstly!!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl)
    {
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}


module.exports.isOwner=async(req,res,next)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner this listing");
    res.redirect(`/listings/${id}`);
}
next();
};

module.exports.validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body); 
  if(error){
      throw new ExpressError(400,error);
  }
  else{
      next();
  }
};

module.exports.validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body); 
  if(error){
      throw new ExpressError(400,error);
  }
  else{
      next();
  }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
  let {id,reviewId}=req.params;
  let review=await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You are not the author this review");
    res.redirect(`/listings/${id}`);
}
next();
};
