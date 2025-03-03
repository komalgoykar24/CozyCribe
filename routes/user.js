const express=require("express");
const router=express.Router();
const User=require("../models/user");
const asyncWrap=require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController=require("../controllers/user.js");

router
.route("/signup" )
.get(userController.renderSignUpForm)
.post(asyncWrap(userController.signup));


router
.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",
    {failureRedirect: '/login',failureFlash:true}),userController.login);

router.get("/logout",userController.logout);

module.exports=router;