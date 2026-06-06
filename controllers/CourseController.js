const CourseModel = require("../models/CoursesModel");
const {PutObjectCommand} = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");
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
const UploadCourseThumbnail = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const fileName =
      `course-thumbnails/${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }),
    );

    const imageUrl =
      `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    res.status(200).json({
      message: "Thumbnail uploaded successfully",
      imageUrl,
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

module.exports = { CreateCourse, GetCourses ,CourseById,UpdateCourse, UploadCourseThumbnail}