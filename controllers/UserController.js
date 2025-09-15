const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AddUser = async (req, res) => {
  try {
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Replace plain password with hashed one
    req.body.password = hashedPassword;

    // Default role (can be "user" or "admin" based on your app logic)
    if (!req.body.role) {
      req.body.role = "user";
    }

    // Create user
    const AddedUser = await UserModel.create(req.body);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: AddedUser._id,
        email: AddedUser.email,
        role: AddedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: AddedUser._id,
        email: AddedUser.email,
        role: AddedUser.role,
      },
      token,
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
    const { email, password } = req.body;

    // 🔍 Find user by email
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔑 Compare password
    const isMatch = bcrypt.compareSync(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // 🎟️ Generate JWT token
    const token = jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role || "user", // default role
      },
      process.env.JWT_SECRET, // keep secret in env
      { expiresIn: "7d" } // token expiry
    );

    // ✅ Return response
    res.status(200).json({
      message: "Logged In Successfully",
      token, // <-- front-end will save this
      data: {
        id: foundUser._id,
        fullname: foundUser.fullname,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Internal server error" });
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
const SearchUser = async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) {
      return res.json({ users: [] });
    }

    const users = await UserModel.find({
      $or: [
        { fullname: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    }).select("_id fullname email avatar");

    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
const GetUserById = async (req, res) => {
  try {
    const UserById = await UserModel.findById(req.params.id).populate(
      "achievements"
    );
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
const DeleteUserById = async(req,res) => {

  try{
 const DeletedUser = UserModel.findByIdAndDelete(req.params.id)
 res.status(200).json({
  message:"User Deleted Successfully",
  data:DeletedUser
 })
  }catch(err){
 res.status(500).json({
  message:err.message
 })
  }
}
module.exports = {
  AddUser,
  GetAllUsers,
  LoginUser,
  GetUserById,
  UpdateUser,
  SearchUser,
  DeleteUserById
};
