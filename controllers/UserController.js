const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const AddUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
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
  try {
    const AllUsers = await UserModel.find();
    res.status(200).json({
      message: "All users fetched successfully",
      users: AllUsers,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const LoginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const foundUserFromEmail = await UserModel.findOne({ email: email });
    console.log(foundUserFromEmail);
    if (foundUserFromEmail != null) {
      const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
      if (isMatch == true) {
        res.status(200).json({
          message: "Logged In Successfully",
          data: foundUserFromEmail,
        });
      } else {
        res.status(400).json({
          message: "Invalid Password",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetUserById = async (req, res) => {
  try {
    const UserById = await UserModel.findById(req.params.id);
    res.status(200).json({
      message: "user Fetched Successfully",
      data: UserById,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Allow only safe fields to be updated
    const allowedUpdates = [
      "fullname",
      "bio",
      "github",
      "linkedin",
      "twitter",
      "avatar",
      "email",
    ];
    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = { AddUser, GetAllUsers, LoginUser, GetUserById, UpdateUser };
