//v8
var express = require("express");
var route = express.Router();
var CampGround = require("../models/campground");

route.get("/campground",function(req,res){
	CampGround.find({},function(err,foundData){
		if(err){
			req.flash("error",err.message)
			return res.redirect("back")
		}
		else{
			res.render("campgrounds/campground",{campground:foundData})
		}
	})
})

route.post("/campground",isLoggedIn,function(req,res){
	//get data from form and store in data array
	CampGround.create({
		name: req.body.campName,
		price : req.body.price,
		image: req.body.imageURL,
		description: req.body.desc,
		author : {
			id : req.user._id,
			username : req.user.username
		}
	})
	req.flash("success","CampGround Created")
	return res.redirect("/campground");
	
})


route.get("/campground/new",isLoggedIn,function(req,res){
	res.render("campgrounds/new");
	
})


// to Show one campground
route.get("/campground/:id",function(req,res){
	CampGround.findById(req.params.id).populate("comments").exec(function(err,foundData){
		if(err){
			req.flash("error",err.message)
			return res.redirect("back")
		}
		else{
			res.render("campgrounds/show",{data:foundData});
		}
	});
	
})
//Edit
route.get("/campground/:id/edit",campground_authorized,function(req,res){
	CampGround.findById(req.params.id,function(err,foundData){
		if(err){
			res.redirect("back")
		}
		else{
			res.render("campgrounds/edit",{data:foundData});
		}
	})
})

//update

route.put("/campground/:id",campground_authorized,function(req,res){
	CampGround.findByIdAndUpdate(req.params.id,req.body.update,function(err,data){
		if(err){
			res.redirect("/campground")
		}
		else{
			req.flash("success","CampGround Updated")
			res.redirect("/campground/"+req.params.id)
		}
	})
})


//destroy


route.delete("/campground/:id",campground_authorized,function(req,res){
	CampGround.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campground/"+req.params.id)
		}
		else{
			req.flash("success","CampGround Removed")
			res.redirect("/campground")
		}
	})
})










function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Login Required");
	res.redirect("/login");
}


function campground_authorized(req,res,next){
	if(req.isAuthenticated()){
        CampGround.findById(req.params.id, function(err, foundCampground){
           if(err){
			   req.flash("error",err.message)
               res.redirect("back");
           }  
			else {
               // does user own the campground?
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} 
				else {
					req.flash("error","Access Denied")
					res.redirect("/campground");
				}
           }
        });
    } 
	else {
		req.flash("error","Login Required")
        res.redirect("back");
    }
}


module.exports = route;
