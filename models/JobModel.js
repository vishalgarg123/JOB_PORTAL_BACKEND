const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 70,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    salary: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    jobType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobType",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const JOB = mongoose.model("job", jobSchema);
module.exports = JOB;
