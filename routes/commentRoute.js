//v8
var express = require("express");
var route = express.Router();
var Comment = require("../models/comment");
var CampGround = require("../models/campground");




//=============================================================
//Comments Section

route.get("/campground/:id/comment/new",isLoggedIn,function(req,res){
	CampGround.findById(req.params.id,function(err,data){
		if(err){
			req.flash("error",err.message)
			return res.redirect("back")
		}
		else{
			res.render("comments/new",{campground:data});
		}
	})
})



route.post("/campground/:id/comment",isLoggedIn,function(req,res){
	CampGround.findById(req.params.id, function(err,data){
		if(err){
			req.flash("error",err.message)
			return res.redirect("/campground");
		}
		else{
			Comment.create(req.body.comment,function(err,comm){
				if(err){
					req.flash("error",err.message)
					return res.redirect("/campground");
				}
				else{
					comm.author.id = req.user._id;
					comm.author.username = req.user.username;
					comm.save();
					data.comments.push(comm);
					data.save();
					req.flash("success","Comment Added")
					return res.redirect('/campground/' + data._id);
				}
			})
		}
	})
})


//Edit
route.get("/campground/:id/comment/:comment_id/edit",comment_authorized,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundData){
		if(err){
			req.flash("error",err.message)
			return res.redirect("back")
		}
		else{
			
			res.render("comments/edit",{data:foundData,Camp_id : req.params.id});
		}
	})
})


//update

route.put("/campground/:id/comment/:comment_id",comment_authorized,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,data){
		if(err){
			req.flash("error",err.message)
			return res.redirect("back")
		}
		else{
			req.flash("success","Comment Updated")
			res.redirect("/campground/"+req.params.id)
		}
	})
})

//delete

route.delete("/campground/:id/comment/:comment_id",comment_authorized,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			req.flash("error",err.message)
			return res.redirect("back")
		}
		else{
			req.flash("success","Comment Removed")
			return res.redirect("/campground/"+req.params.id)
		}
	})
})








function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Login Required");
	return res.redirect("/login");
}


function comment_authorized(req,res,next){
	if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
           if(err){
			   req.flash("error",err.message)
               res.redirect("back");
           }  
			else {
				if(comment.author.id.equals(req.user._id)) {
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

