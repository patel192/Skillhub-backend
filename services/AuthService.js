const UserModel = require("../models/UserModel");
const UserSettings = require("../models/UserSettingsModel");
const {generateAccessToken} = require("../utils/jwt");
const {hashPassword,comparePassword} = require("../utils/password");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");

const login = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    // Find user
    const foundUser = await UserModel.findOne({
        email: normalizedEmail,
    });

    if (!foundUser) {
        throw new AppError("User not found", 404);
    }
    // Compare password
    const isMatch = await comparePassword(
        password,
        foundUser.password
    );
    if (!isMatch) {
        throw new AppError("Invalid Password", 400);
    }
    const token = generateAccessToken(foundUser);
    return {
        token,
        user: {
            id: foundUser._id,
            fullname: foundUser.fullname,
            email: foundUser.email,
            role: foundUser.role,
            avatar: foundUser.avatar,
        },
    };
};

const register = async (userData) => {
    const email = userData.email.trim().toLowerCase();
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new AppError(
            "Email already registered. Please login instead.",
            400
        );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await hashPassword(userData.password,salt);
    const newUser = await UserModel.create({
        ...userData,
        email,
        password: hashedPassword,
    });

    await UserSettings.create({
        userId: newUser._id,
    });

    return {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
    };
};

const changePassword = async (userId,authenticatedUserId,currentPassword,newPassword) => {
    // User can only change their own password
    if (userId !== authenticatedUserId) {
        throw new AppError("Unauthorized: You can only change your own password",403);
    }

    if (!currentPassword || !newPassword) {
        throw new AppError("Current password and new password are required",400);
    }

    if (newPassword.length < 8) {
        throw new AppError("New password must be at least 8 characters long",400);
    }

    const user = await UserModel.findById(userId).select("+password");
    if (!user) {
        throw new AppError("User not found", 404);
    }

    const isMatch = await comparePassword(currentPassword,user.password);
    if (!isMatch) {
        throw new AppError("Current password is incorrect",400);
    }

    const isSamePassword = await comparePassword( newPassword,user.password);
    if (isSamePassword) {
        throw new AppError("New password must be different from the current password",400);
    }

    user.password = await hashPassword(newPassword);
    user.tokenVersion = (user.tokenVersion || 0) + 1;

    await user.save();

    return {
        changedAt: new Date().toISOString(),
    };
};

module.exports = {
    login,
    register,
    changePassword
};