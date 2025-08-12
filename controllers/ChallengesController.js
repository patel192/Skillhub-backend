const ChallengesModel = require("../models/ChallengesModel");
const AddChallenge = async (req, res) => {
  try {
    const AddedChallenge = await ChallengesModel.create(req.body);
    res.status(201).json({
      Message: "Challenge Added successfully",
      data: AddedChallenge,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetChallengesByCoursId = async (req,res)=>{
  try{
    const Courses = await ChallengesModel.find({courseId:req.params.courseId})
    res.status(200).json({
      message:"Challenges Fetched Successfully",
      data:Courses
    })
  }catch(err){
   res.status(500).json({
    message:err.message
   })
  }
}


module.exports = { AddChallenge, GetChallengesByCoursId}