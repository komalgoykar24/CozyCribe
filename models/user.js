const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const localPassportMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
 email:{
    type:String,
    required:true
 }
});

userSchema.plugin(localPassportMongoose);
const User=mongoose.model("User",userSchema);
module.exports=User;