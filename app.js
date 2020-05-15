//v8
var express = require("express");
var app = express();
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seeds");
var LocalStrategy = require("passport-local");
var session = require("express-session");
var passport = require("passport");
var passportLocal = require("passport-local");
var methodOverride = require("method-override");


app.locals.moment = require("moment");


var url = process.env.DATABASEURL || "mongodb://localhost/yelpcamp"
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true});




var CampGround = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

var campgroundRoute = require("./routes/campgroundRoute");
var commentRoute = require("./routes/commentRoute");
var authRoute = require("./routes/authRoute");




app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();




app.use(session({
	secret : "SomeText",
	resave : false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.use(function(req, res, next){
	res.locals.CurrentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.get("/",function(req,res){
	res.render("landing");
})



app.use(campgroundRoute);
app.use(commentRoute);
app.use(authRoute);




app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server has Started");
})