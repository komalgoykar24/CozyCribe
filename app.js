if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const dbURL = process.env.ATLASDB_URL;
// const dbURL="mongodb://localhost:27017/wanderlust";



const middlewares = require('./middlewares.js');

const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: { secret: process.env.SECRET },
    touchAfter: 7 * 3600,
});

store.on("error", () => {
    console.log("Error in session store", err);
});

const sessionOpt = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
    tls: true, // Force TLS
  tlsInsecure: true,
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOpt));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const listingRoute = require("./routes/listings.js");
const reviewRoute = require("./routes/reviews.js");
const userRoute = require("./routes/user.js");

main().then(() => {
    console.log("Connection is established..");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbURL,{
        tlsAllowInvalidCertificates: true
    });
}
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use("/", userRoute);

app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "sanu24@gmail.com",
        username: "SanikaPatil"
    });
    let registerUser = await User.register(fakeUser, "komal123");
    res.send(registerUser);
    console.log(registerUser);
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("./listing/error.ejs", { message });
});

app.listen(8080, () => {
    console.log("app is listening on port 8080");
});
