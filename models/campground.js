var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
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
	},
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
})
//model and return
module.exports = mongoose.model("CampGround",Schema);