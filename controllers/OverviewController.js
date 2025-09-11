const OverviewModel = require("../models/OverviewModel");
const AddOverview = async (req, res) => {
  try {
    const AddedOverview = await OverviewModel.create(req.body);
    res.status(200).json({
      message: "Overview Added Successfully",
      data: AddedOverview,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
const OverviewByCourseId = async (req, res) => {
  try {
    const Overview = await OverviewModel.findOne({
      courseId: req.params.courseId,
    });
    res.status(200).json({
      message: "Overview Fetched Sucessfully",
      data: Overview,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const UpdateOverview = async (req,res) => {
  try {
    const { courseId } = req.params;
    const { point } = req.body;

    let overview = await OverviewModel.findOne({ courseId });

    if (!overview) {
      // if no overview exists, create one
      overview = await OverviewModel.create({
        courseId,
        overview: [point],
      });
    } else {
      overview.overview.push(point); // add bullet one by one
      await overview.save();
    }

    res.status(200).json({
      message: "Overview updated successfully",
      data: overview,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports = {
  AddOverview,
  OverviewByCourseId,
  UpdateOverview
};
