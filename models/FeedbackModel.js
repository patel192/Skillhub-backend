const Schema = require("mongoose").Schema
const FeedbackSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"Course"
    },
    rating:{
        type:Number,
        required:[true,"Rating is required"],
    },
    comment:{
        type:String
    }
},{
    timestamps:true
})