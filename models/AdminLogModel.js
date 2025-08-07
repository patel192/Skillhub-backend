const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const AdminLogSchema = Schema({
    adminId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    action:{
        type:String,
        required:[true, "Action is required"]
    },
    detials:{
        type:"String",
        required:[true, "Details are required"]
    }
},{
    timestamps:true
})
module.exports = mongoose.model("AdminLog", AdminLogSchema);