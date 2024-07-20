const mongoose = require("mongoose");
const jobTypeSchema = new mongoose.Schema(
  {
    jobTypeName: {
      type: String,
      trim: true,
      required: [true, "job category is required"],
      maxlength: 70,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const JOBTYPE = mongoose.model("jobType", jobTypeSchema);

module.exports = JOBTYPE;
