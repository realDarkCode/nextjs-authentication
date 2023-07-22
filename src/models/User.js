import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "INACTIVE",
  },
  verifyToken: String,
  verifyTokenExpireAt: Date,
  forgetPasswordToken: String,
  forgetPasswordTokenExpireAt: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
