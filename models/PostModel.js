const mongoose = require("mongoose")
const Schema= mongoose.Schema
const CommentSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const PostSchema = new Schema({
     userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
     },
     content:{
        type:String,
        required:true
     },
     likes:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
     ],
     comments:[CommentSchema]
},{
    timestamps:true
})
module.exports = mongoose.model("Post",PostSchema)