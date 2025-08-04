const CourseModel = require("../models/CoursesModel");
const CreateCourse = async (req, res) => {
  try {
    const AddedCourse = await CourseModel.create(req.body);
    res.status(201).json({
      Message: "Course created successfully",
      data: AddedCourse,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetCourses = async (req,res)=>{
  try{
    const Courses = await CourseModel.find()
    res.status(200).json({
      message:"Courses Fetched Successfully",
      data:Courses
    })
  }catch(err){
   res.status(500).json({
    message:err.message
   })
  }
}

module.exports = { CreateCourse, GetCourses }