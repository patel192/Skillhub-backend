const EnrollmentController = require("../models/EnrollmentModel");
const eventEmitter = require("../events/EventEmitter")
const AddEnrollment = async (req, res) => {
  try {
    const AddedEnrollment = await EnrollmentController.create(req.body);
    eventEmitter.emit("ENROLLMENT_CREATED",{
      userId:AddedEnrollment.userId,
      courseId:AddedEnrollment.courseId
    })
    res.status(200).json({
      message: "User Enrolled Successfully",
      data: AddedEnrollment,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
const EnrollmentsByUserId = async (req, res) => {
  try {
    const Enrolls = await EnrollmentController.find({
      userId: req.params.userId,
    }).populate("courseId");
    res.status(200).json({
      message: "Enrolls For user Found Successfully",
      data: Enrolls,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetEnrollments = async (req, res) => {
  try {
    const Enrolls = await EnrollmentController.find().populate("courseId");
    res.status(200).json({
      message: "Enrolls Found Successfully",
      data: Enrolls,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  AddEnrollment,
  EnrollmentsByUserId,
  GetEnrollments
};
