const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main().then(()=>{
    console.log("Connection is establish..");
}).catch((err)=>{
    console.log(err);
});

async function main(params) {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
};

const initDb=async()=>{
     await Listing.deleteMany({});
     initData.data= initData.data.map((obj)=>({...obj,owner:"67b57cdce997885944a4c4ec" }));
     await Listing.insertMany(initData.data);
     console.log("Data was inserted..");
};

initDb();