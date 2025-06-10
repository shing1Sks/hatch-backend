import profileRouter from "./profile.routes.js";
import { Router } from "express";

const router = Router();

router.use("/profile", profileRouter);

export default router;
