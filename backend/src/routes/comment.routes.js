import express from "express";
import { addComment, getCommentsByPost } from "../controllers/comment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/post/:id/comment", authMiddleware, addComment)
router.get("/post/:id/comments", authMiddleware, getCommentsByPost
)

export default router