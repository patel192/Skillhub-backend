const UserModel = require("../models/UserModel");
const AddUser = async (req, res) => {
  try {
    const AddedUser = await UserModel.create(req.body);
    res.status(201).json({
      message: "User added successfully",
      user: AddedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetAllUsers = async (req, res) => {
  try{
   const AllUsers = await UserModel.find();
   res.status(200).json({
    message: "All users fetched successfully",
    users: AllUsers,
   })
  }catch(err){
    res.status(500).json({
      message: err.message,
    });
  }
}
module.exports = { AddUser,GetAllUsers };