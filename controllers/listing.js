const Listing=require("../models/listing");
const asyncWrap=require("../utils/wrapAsync");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async(req,res)=>{
    let allListings=await Listing.find({});
    res.render("./listing/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>
    {
   res.render("./listing/new.ejs");
    };

    module.exports.showListing=async(req,res)=>{
        let {id}=req.params;
        let listing=await Listing.findById(id).populate({path:"review",populate:"author"}).populate("owner");
        if(!listing){
         req.flash("error"," Listing you are requested for does not exists!!");
         return res.redirect("/listings")
        }
       res.render("listing/show.ejs",{listing});
      };

module.exports.createListing=async(req,res,next)=>{
   let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        proximity: [-95.4431142, 33.6875431]
      })
        .send();
    const newListing=new Listing(req.body.listing);
    let url=req.file.path;
    let filename=req.file.filename;
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry ;
    let savedListing=await newListing.save();
    req.flash("sucess","New Listing is Created!!");
    res.redirect("/listings")
   };

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
        req.flash("error"," Listing you are requested for does not exists!!");
        return res.redirect("/listings")
    }
    let originalURL=listing.image.url;
    let imageURL= originalURL.replace("/upload","/upload/h_200,w_300,e_blur:200")
    res.render("./listing/edit",{listing,imageURL});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    console.log("Listing ID:", id);
    console.log("Updated Data:", req.body.listing);

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    console.log("Request Body:", req.body);
    if (req.file) { // Ensure req.file is defined before accessing properties
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

console.log("Request File:", req.file);

    req.flash("success", "Listing Updated!!");
    res.redirect(`/listings/${id}`);
};

module.exports.deletListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("sucess"," Listing  Deleted!!");
    res.redirect("/listings");
};

module.exports.filterCategory= async (req, res) => {
    try {
        const category = req.query.category;
        if (!category) return res.status(400).json({ error: "Category is required" });

        const filteredListings = await Listing.find({ category: { $in: [category] } });
        res.json(filteredListings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.searchListing= async (req, res) => {
    try {
        let query = req.query.q;
        let listings = await Listing.find({ $or: [
            { location: { $regex: query, $options: "i" } }, // Case-insensitive location match
            { country: { $regex: query, $options: "i" } },
            { title: { $regex: query, $options: "i" } }   // Case-insensitive country match
        ] });
        res.json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


