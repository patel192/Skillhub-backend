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
        enum:["admin", "user"],
        default:"user"
    },
    avatar:{
        type:String,
        default:""
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps: true
})
module.exports = mongoose.model("User", UserSchema);