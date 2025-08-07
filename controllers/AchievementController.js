const AchievementModel = require("../models/AchievementModel")
const AddAchievement = async (req,res) => {
    try{
     const AddedAchievement = await AchievementModel.create(req.body)
     res.status(200).json({
        Message:"Achievement Added Successfully",
        data:AddedAchievement
     })
    }catch(err){
     res.status(500).json({
        message:err.message || "Internal Server Error"
     })
    }
} 
module.exports = {
    AddAchievement
}