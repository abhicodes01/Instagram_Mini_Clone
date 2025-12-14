import express from "express";
import { createPost, toggleLikePost, getFeed } from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/", authMiddleware, createPost)
router.post("/:id/like", authMiddleware, toggleLikePost)
router.get("/feed", authMiddleware, getFeed)

export default router