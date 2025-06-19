import Profile from "../schemas/profile.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getAuth } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";

const setupAccount = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const userId = auth.userId;
  const { username } = req.body;

  const profile = await Profile.findOne({ userId });

  if (profile) {
    return res.status(200).json({ message: "Profile already exists", profile });
  }

  const newProfile = new Profile({ userId, username });
  await newProfile.save();

  res.status(200).json({ message: "Profile created successfully", newProfile });
});

const updateProfilePic = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const localFilePath = req.file.path;
  const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

  if (!cloudinaryResponse) {
    return res
      .status(500)
      .json({ message: "Error uploading file to Cloudinary" });
  }

  const profile = await Profile.findOne({ userId });

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  const existingImage = profile.image;
  if (existingImage) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const extractPublicId = (url) => {
      // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/folder/myimage.jpg
      const parts = url.split("/");
      const fileName = parts.pop(); // myimage.jpg
      const publicId =
        parts.slice(parts.indexOf("upload") + 1).join("/") +
        "/" +
        fileName.split(".")[0];
      return publicId;
    };

    const publicId = extractPublicId(project.image);

    try {
      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.warn("Cloudinary deletion failed (may not exist):", err.message);
    }
  }

  profile.image = cloudinaryResponse.secure_url;
  await profile.save();

  res.status(200).json({ message: "Profile picture updated successfully" });
});

const updateAbout = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const userId = auth.userId;
  const { about } = req.body;
  const profile = await Profile.findOne({ userId });

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  profile.description = about;
  await profile.save();
  res.status(200).json({ message: "About updated successfully", profile });
});

const addSocialLink = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const userId = auth.userId;
  const { link, tag } = req.body;

  const profile = await Profile.findOne({ userId });
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  profile.profiles.push({ link, tag });
  await profile.save();

  res.status(200).json({ message: "Social link added successfully", profile });
});

const removeSocialLink = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const userId = auth.userId;
  const { link } = req.body;

  const profile = await Profile.findOne({ userId });
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  const updatedProfiles = profile.profiles.filter(
    (profile) => profile.link !== link
  );

  profile.profiles = updatedProfiles;
  await profile.save();

  res
    .status(200)
    .json({ message: "Social link removed successfully", profile });
});

export {
  setupAccount,
  updateProfilePic,
  updateAbout,
  addSocialLink,
  removeSocialLink,
};
