//v8
var express = require("express");
var route = express.Router();
var passport = require("passport");
var User = require("../models/user");



//====================
//Auth

route.get("/register",function(req,res){
	res.render("register");
})

route.post("/register",function(req,res){
	var data = new User({username: req.body.username})
	User.register(data , req.body.password , function(err,NewUser){
		if(err){
			req.flash("error",err.message);
			return res.redirect("/campground");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to YelpCamp " +req.body.username);
			return res.redirect("/campground");
		})
	})
})

route.get("/login",function(req,res){
	res.render("login");
})


route.post("/login",passport.authenticate("local",{
	
	successRedirect : "/campground",
	failureRedirect : "/login"
	}),function(req,res){	
})

route.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged Out");
	res.redirect("/campground");
})




module.exports = route;