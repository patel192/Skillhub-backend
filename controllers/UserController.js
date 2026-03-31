const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSettings = require("../models/UserSetitngsModel");

const AddUser = async (req, res) => {
  try {
    // Normalize email
    const email = req.body.email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered. Please login instead.",
      });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Create user
    const newUser = await UserModel.create({
      ...req.body,
      email,
      password: hashedPassword,
    });
    await UserSettings.create({ userId: newUser._id });

    res.status(201).json({
      message: "User added successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
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
      { expiresIn: "7d" }, // token expiry
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
      "achievements",
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
const DeleteUserById = async (req, res) => {
  try {
    const DeletedUser = UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User Deleted Successfully",
      data: DeletedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const ChangePassoword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    const authUserId = req.user.id;

    if (userId !== authUserId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only change your own password",
      });
    }
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters Long",
      });
    }
    const user = await UserModel.findById(userId).select(`+password`);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current Password is Incorrect",
      });
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New Password must be different from the current password",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: {
        changedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  AddUser,
  GetAllUsers,
  LoginUser,
  GetUserById,
  UpdateUser,
  SearchUser,
  DeleteUserById,
  ChangePassoword,
};
