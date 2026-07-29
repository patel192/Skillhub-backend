const CourseModel = require("../models/CoursesModel");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");
const AppError = require("../utils/AppError");

const createCourse = async (courseData) => {
  const course = await CourseModel.create(courseData);

  return course;
};

const uploadCourseThumbnail = async (file) => {
  if (!file) {
    throw new AppError("No file uploaded", 400);
  }

  const fileName = `course-thumbnails/${Date.now()}-${file.originalname}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

const getCourses = async () => {
  return await CourseModel.find();
};

const getCourseById = async (courseId) => {
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  return course;
};

const updateCourse = async (courseId, updateData) => {
  const updatedCourse = await CourseModel.findByIdAndUpdate(
    courseId,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedCourse) {
    throw new AppError("Course not found", 404);
  }

  return updatedCourse;
};

module.exports = {
  createCourse,
  uploadCourseThumbnail,
  getCourses,
  getCourseById,
  updateCourse,
};
