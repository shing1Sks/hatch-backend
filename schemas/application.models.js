import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    email: {
      type: String,
    },
    type: {
      type: String,
      enum: ["opening", "mentorship"],
      default: "opening",
    },
    coverLetter: {
      type: String,
    },
    resume: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    status: {
      type: String,
      enum: ["applied", "rejected", "shorlisted", "accepted"],
      default: "applied",
    },
    interviewLink: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
