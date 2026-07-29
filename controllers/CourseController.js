const CourseService = require("../services/CourseService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const CreateCourse = catchAsync(async (req, res) => {
  const course = await CourseService.createCourse(req.body);

  return ResponseHandler.success(
    res,
    "Course created successfully",
    course,
    201,
  );
});

const UploadCourseThumbnail = catchAsync(async (req, res) => {
  const imageUrl = await CourseService.uploadCourseThumbnail(req.file);

  return ResponseHandler.success(res, "Thumbnail uploaded successfully", {
    imageUrl,
  });
});

const GetCourses = catchAsync(async (req, res) => {
  const courses = await CourseService.getCourses();

  return ResponseHandler.success(res, "Courses fetched successfully", courses);
});

const CourseById = catchAsync(async (req, res) => {
  const course = await CourseService.getCourseById(req.params.id);

  return ResponseHandler.success(res, "Course fetched successfully", course);
});

const UpdateCourse = catchAsync(async (req, res) => {
  const updatedCourse = await CourseService.updateCourse(
    req.params.id,
    req.body,
  );

  return ResponseHandler.success(
    res,
    "Course updated successfully",
    updatedCourse,
  );
});

module.exports = {
  CreateCourse,
  UploadCourseThumbnail,
  GetCourses,
  CourseById,
  UpdateCourse,
};
