const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ReportSchema = Schema({
    reporter:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },       
    type:{
        type:String,
        enum:["bug", "abuse", "inappropriate"],
        default:"bug"
    },
    description:{
        type:String,
    },
    status:{
        type:string,
        enum:["open", "reviewing", "closed"],
        default:"open"
    },
    targetType:{
        type:String
    },
    targetId:{
        type:Schema.Types.ObjectId,
        ref:"Course"
    }
},{
    timestamps:true
})
module.exports = mongoose.model("Report",ReportSchema)