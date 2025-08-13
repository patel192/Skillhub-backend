const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const QuizSchema = Schema({
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    question:{
        type:String,
        required:true
    },
    options:[
        {
            text:{
                type:String,
                required:true
            },
            isCorrect:{
                type:Boolean,
                required:true
            },
            explanation:{
                type:String
            }
        }
    ],
    points:{
        type:Number,
        default:1
    }
},{
    timestamps:true
})
module.exports = mongoose.model("Quiz",QuizSchema)