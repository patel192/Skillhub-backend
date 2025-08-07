const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const MessagesModel = Schema({
    userId : {
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    subject:{
        type:String
    },
    content:{
        type:String
    },
    reply:{
        type:String
    },
    isResolved:{
        type:Boolean
    }
},{
    timestamps:true
})
module.exports = mongoose.model("Messages",MessagesModel)