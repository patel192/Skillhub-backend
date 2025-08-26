const AchievementModel = require("../models/AchievementModel");
const UserModel = require("../models/UserModel");
const CreateAchievement = async (req, res) => {
  try {
    const { name, icon, pointsRequired } = req.body;
    const Achievement = await AchievementModel.create(req.body);
    res.status(200).json({
      success: true,
      Achievement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const CheckAchievement = async(req,res) => {
    try{
    const {userId} = req.params
    const User = await UserModel.findbyId(userId).populate("achievements")
    const allAchievements = await AchievementModel.find()
    let newlyUnlocked  = []; 
    for (const ach of allAchievements) {
      const alreadyHas = User.achievements.some(
        (a) => a._id.toString() === ach._id.toString()
      );

      if (User.points >= ach.pointsRequired && !alreadyHas) {
        User.achievements.push(ach._id);
        newlyUnlocked.push(ach);
      }
    }
    await User.save()
    res.json({
        success:true,
        newlyUnlocked,
        achievements:User.achievements
    })
    }catch(err){
    res.status(500).json({
        success:false,
        error:err.message
    })
    }
}
const GetUserAchievements = async(req,res) => {
    try{
    const {userId} = req.params
    const User = await UserModel.findbyId(userId).populate("achievements")
    res.json({
        success:true,
        achievement:User.achievements
    })
    }catch(err){
  res.status(500).json({
    success:false,
    error:err.message
  })
    }
}
const GetAchievements = async(req,res) => {
   try{
  const AllAchivements = await AchievementModel.find()
  res.status(200).json({
    message:"All Achievements Fetched Successfully",
    data:AllAchivements
  })
   }catch(err){
  res.status(500).json({
    message:err.message
  })
   }
}
module.exports = {
  CreateAchievement,
  CheckAchievement,
  GetUserAchievements,
  GetAchievements
};
