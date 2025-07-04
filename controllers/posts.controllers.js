import Profile from "../schemas/profile.models.js";
import Post from "../schemas/post.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAuth } from "@clerk/express";

const getUserPosts = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  // Find the profile by userId
  const profile = await Profile.findOne({ userId });
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  const posts = await Post.find({ username: profile.username });

  res.status(200).json({ posts });
});

export { getUserPosts };
