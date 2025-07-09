import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getUserPosts,
  createPost,
  getAllPosts,
} from "../controllers/posts.controllers.js";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/posts", getAllPosts);

router.use(requireAuth());

router.get("/", getUserPosts);
router.post("/posts/create", upload.single("image"), createPost);

export default router;
