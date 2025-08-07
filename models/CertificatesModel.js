const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const CertificateSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"Course"
    },
    certificateUrl:{
        type:String,
        required:[true,"Certificate URL is required"]
    }
},{
    timestamps:true
})
module.exports = mongoose.model("Certificate", CertificateSchema);