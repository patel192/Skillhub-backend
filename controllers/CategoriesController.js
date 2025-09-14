const CategoriesController = require("../models/CategoriesModel");
const AddCategory = async (req, res) => {
  try {
    const AddedCategory = await CategoriesController.create(req.body);
    res.status(200).json({
      Message: "Category Added Successfully",
      data: AddedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = {
  AddCategory,
};
