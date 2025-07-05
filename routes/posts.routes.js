import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { getUserPosts, createPost } from "../controllers/posts.controllers.js";

const router = Router();

router.get("/", getUserPosts);
router.post("/create", upload.single("image"), createPost);

export default router;
