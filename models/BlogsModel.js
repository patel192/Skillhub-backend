const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogsSchema = Schema({
    title:{
        type:String
    },
    authorId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String
    },
    tags:{
        type:[String]
    }
},{
    timestamps:true
})
module.exports  = mongoose.model("Blogs",BlogsSchema);