import { updateProfilePic } from "../controllers/profiles.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { requireAuth } from "@clerk/express";

const router = Router();

router.use(requireAuth());

router.post(
  "/update-profile-pic",
  upload.single("profilePic"),
  updateProfilePic
);

export default router;
