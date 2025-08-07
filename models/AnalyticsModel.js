const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AnalyticsSchema = Schema({
    metric:{
        type: String,
    },
    value:{
        type:Number
    },
    date:{
        type: Date,
        default: Date.now
    }
},{
    timestamps:true
})
module.exports = mongoose.model("Analytics",AnalyticsSchema)