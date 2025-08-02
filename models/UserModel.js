const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = Schema({
    fullname:{
        type: String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["admin", "user"]
    },
    avatar:{
        type:String
    },
    isActive:{
        type:Boolean
    }
},{
    timestamps: true
})
module.exports = mongoose.model("User", UserSchema);