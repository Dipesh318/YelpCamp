var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
	text : String,
	createdAt :{
		type : Date,
		default : Date.now
	},
	author: {
		id: {
			type : mongoose.Schema.Types.ObjectId,
			ref : "User"
		},
		username : String
	}
});
//model and return
module.exports = mongoose.model("Comment",Schema);