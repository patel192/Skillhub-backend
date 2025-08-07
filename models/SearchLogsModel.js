const mongoose = require("mongoose")
const Schema = mongoose.Schema
const SearchLogsSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    query:{
        type:String,
        required:[true, "Search query is required"]
    },
    seachedAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("SearchLogs",SearchLogsSchema)