const Listing=require("../models/listing");
const Review=require("../models/reviews");

module.exports.createRoute=async(req,res)=>{
    console.log(req.params);
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview);
    listing.review.push(newReview);
    await listing.save();
    await newReview.save();
    req.flash("sucess","New Review is Created!!");
    res.redirect(`/listings/${listing._id}`);
  };

  module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("sucess","Review is Deleted!!");
    res.redirect(`/listings/${id}`)
};