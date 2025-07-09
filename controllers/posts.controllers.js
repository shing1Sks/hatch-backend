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

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("applications replies upvotes");
  res.status(200).json({ success: true, posts });
});

const createPost = asyncHandler(async (req, res) => {
  const {
    username,
    title,
    description,
    type = "post",
    applicationOpen = false,
    links = [],
  } = req.body;

  // Validate required fields
  if (!username || !title || !description) {
    return res.status(400).json({
      success: false,
      message: "username, title, and description are required.",
    });
  }

  let imageUrl = null;

  // If image is uploaded
  if (req.file) {
    const localFilePath = req.file.path;
    const cloudinaryResult = await uploadOnCloudinary(localFilePath);

    // Delete local temp file
    fs.unlink(localFilePath, (err) => {
      if (err) console.warn("Error cleaning up temp file:", err.message);
    });

    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
      return res
        .status(500)
        .json({ message: "Image upload to Cloudinary failed." });
    }

    imageUrl = cloudinaryResult.secure_url;
  }

  const newPost = new Post({
    username,
    title,
    description,
    type: type === "project" ? "project" : "post",
    applicationOpen: type === "project" ? applicationOpen : false,
    image: imageUrl,
    links,
  });

  const savedPost = await newPost.save();

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post: savedPost,
  });
});

export { getUserPosts, createPost, getAllPosts };
