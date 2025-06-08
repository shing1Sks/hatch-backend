import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    userId: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    profiles: [
      {
        link: {
          type: String,
        },
        tag: {
          type: String,
        },
      },
    ],
    mentorship: {
      openToMentor: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    applications: {
      sent: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Application",
        },
      ],
      received: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Application",
        },
      ],
    },
    upvotedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    upvotedReplies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);
