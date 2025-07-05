import profileRouter from "./profile.routes.js";
import postRouter from "./posts.routes.js";
import { Router } from "express";

const router = Router();

router.use("/profile", profileRouter);
router.use("/posts", postRouter);

export default router;
