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
const CourseById = async (req,res) =>{
  try{
  const Course = await CourseModel.findById(req.params.id)
  res.status(200).json({
    message:"Course fetched Successfully",
    data:Course
  })
  }catch(err){
  res.status(500).json({
    message:err.message
  })
  }
}
const UpdateCourse = async (req,res) => {
  try {
    const updated = await CourseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({
      message: "Course updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = { CreateCourse, GetCourses ,CourseById,UpdateCourse}