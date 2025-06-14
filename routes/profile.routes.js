import {
  updateProfilePic,
  setupAccount,
  updateAbout,
} from "../controllers/profiles.controllers.js";
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

router.post("/setup-account", setupAccount);

router.post("/update-about", updateAbout);

export default router;
