const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const jobsHistorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 70,
    },

    description: {
      type: String,
      trim: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
    },
    interviewDate: {
      type: Date,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlenght: 7,
    },

    jobsHistory: [jobsHistorySchema],

    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// return a JWT token
userSchema.methods.getJwtToken = function () {
  return JWT.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

const User = mongoose.model("user", userSchema);
module.exports = User;
