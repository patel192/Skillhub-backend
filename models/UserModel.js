const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default:""
    },
    linkedin: {
      type: String,
      default:""
    },
    twitter: {
      type: String,
      default:""
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    points:{
      type:Number,
      default:0
    },
    achievements:[{
      type:Schema.Types.ObjectId,
      ref:"Achievement",
      default:[]
    }]
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);
