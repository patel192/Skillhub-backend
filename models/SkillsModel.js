const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const SkillsSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    skillName:{
        type:String,
        required:[true,"Skill name is required"]
    },
    level:{
        type:String,
        enum:["Beginner","Intermediate","Advanced"],
        default:"Beginner"
    },
    certified:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})
module.exports = mongoose.model("Skill",
SkillsSchema
)