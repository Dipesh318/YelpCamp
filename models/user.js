	//v7


var mongoose = require("mongoose");
var passport = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
	username : String,
	password : String,
	name : String
})

UserSchema.plugin(passport);

module.exports = mongoose.model("user",UserSchema);