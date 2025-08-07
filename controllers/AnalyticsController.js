const AnalyticsModel = require("../models/AnalyticsModel")
const AddAnalytics = async(req,res) =>{
    try{ 
        const AddedAnalytics = await AnalyticsModel.create(req.body)
        res.status(200).json({
            Message:"Analytics Added Successfully",
            data:AddedAnalytics
        })
    }catch(err){
    res.status(500).json({
        message:err.message || "Internal Server Error"
    })
    }
}
module.exports = {
    AddAnalytics
}