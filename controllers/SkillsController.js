const SkillsModel = require("../models/SkillsModel");
const AddSkill = async (req, res) => {
  try {
    const AddedSkill = await SkillsModel.create(req.body);
    res.status(200).json({
      message: "Skill Added Successfully",
      data: AddedSkill,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
module.exports = {
  AddSkill,
};
