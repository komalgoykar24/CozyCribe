const User=require("../models/user");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signup=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=new User({username,email});
        let registerUser=await User.register(newUser,password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }  
            req.flash("sucess","Welcome to WanderLust"); 
            res.redirect("/listings");
        });
       }
    catch(err)
    {
        req.flash("error",err.message);
        res.redirect("/signup")
    }
 
};

module.exports.renderLoginForm=(req,res)=>{
    res.render("./users/login.ejs")
};

module.exports.login=async (req,res)=>{
    req.flash("sucess","Welcome to WanderLust,You Login Sucessfully!!");
    let redirectPage=res.locals.redirectUrl || "/listings"
    res.redirect(redirectPage);

};

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
      if(err)
      {
           return next(err);
      }
      else{
          req.flash("sucess","You are logged out successfully!!");
          res.redirect("/listings");
      }
    })
  };