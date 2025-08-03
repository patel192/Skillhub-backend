const CoursesModel = require("../models/CoursesModel");
const AddCourse = async (req, res) => {
  try {
    const AddedCourse = await CoursesModel.create(req.body);
    res.status(201).json({
      message: "Course added successfully",
      data: AddedCourse,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetCourses = async (req, res) => {
  try {
    const Courses = await CoursesModel.find();
    res.status(200).json({
      message: "Courses fetched successfully",
      data: Courses,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = { AddCourse,GetCourses };
