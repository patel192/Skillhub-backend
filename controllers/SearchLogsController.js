const SearchLogsModel = require("../models/SearchLogsModel")
const AddSearchLog = async (req, res) => {
    try{
        const AddedSearchLog = await SearchLogsModel.create(req.body)
        res.status(200).json({
            message: "Search Log Added Successfully",
            data: AddedSearchLog
        })
    }catch(err){
        res.status(500).json({
            message: err.message || "Internal Server Error"
        })
    }
}
module.exports = {
    AddSearchLog
}