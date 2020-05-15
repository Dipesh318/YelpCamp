var mongo = require("mongoose");
var CampGround = require("./models/campground");
var Comment = require("./models/comment");
var data=[
	{
		name:"Scottish Border",
		image:"https://cms.pm/uploads/crossburn-caravans-new.seesite.biz_--_860364047.jpg",
		description:"The Scottish Borders is one of 32 council areas of Scotland. It borders the City of Edinburgh, Dumfries and Galloway, East Lothian, Midlothian, South Lanarkshire, West Lothian and, to the south-west, south and east, the English counties of Cumbria and Northumberland."
	},
	{
		name:"Kashmir",
		image:"https://k6u8v6y8.stackpathcdn.com/blog/wp-content/uploads/2016/01/best-adventure-weekend-treks-from-delhi.png",
		description:"Known as the “Paradise on Earth”, Kashmir justifies its identity with the astounding beauty which you can experience while trekking in Kashmir. The land has retained its old-world charm, enabling you to time-travel into the beautiful world of poetry and music nestled in the Himalayas. Along with the enchanting beauty of the mountains, the Himalayas also serve as an adventurous outing option for thrill enthusiasts who want to test their mettle. While the summer treks promise a mesmerizing sojourn into the mountains, the winter treks are everything you desire if you are a snow enthusiast and/or thrill seeker.  The treks in the Himalayas are an ideal so"
	},
	{
		name:"Dudhsagar",
		image:"https://tripraja.com/wp-content/uploads/2019/06/Trek-to-dudhsagar-falls.jpg",
		description:"Kodagu, also known as Coorg, is a rural district in the southwest Indian state of Karnataka. In the area’s north, Madikeri Fort has 2 life-size elephant statues at its entrance, plus a Gothic-style church with a museum on its grounds."
	}
]

function seedDB(){
	// remove 
	CampGround.remove({},function(err){
		if(err){
			console.log("ERROR");
		}
		else{
			console.log("Removed");
			//add
			data.forEach(function(seed){
				CampGround.create(seed,function(err,data){
					if(err){
						console.log("ERROR");
					}
					else{
						console.log("New CampGround");
						Comment.create(
							{
								text:"Ok OK place to go",
								author:"ABC XYZ"
							},function(err,comment){
								if(err){
									console.log("Error")
								}else{
									data.comments.push(comment);
									data.save();
									console.log("Comment Added");
								}
							})
					}
				});
			});
		}
	});	
}

module.exports = seedDB;