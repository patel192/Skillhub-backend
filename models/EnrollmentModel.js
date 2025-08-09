const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EnrollementSchema = Schema({
    userId: {
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"Course"
    },
    status:{
        type:String,
        enum:["active", "completed", "dropped","cancelled","Registered"],
        default:"Registered"
    },
    progress:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})
module.exports = mongoose.model("Enrollement",EnrollementSchema)