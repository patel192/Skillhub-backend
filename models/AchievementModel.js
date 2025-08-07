const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AchievementSchema = Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User"
  } ,
  title:{
    type:String
  },
  description:{
    type:String
  },
  badgeIcon:{
    type:String
  }
},{
    timestamps:true
})