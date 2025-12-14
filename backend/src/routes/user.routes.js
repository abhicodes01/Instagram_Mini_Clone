import express from "express";
import {
  followUser,
  unfollowUser,
  getUserPosts,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id/follow", authMiddleware, followUser);
router.post("/:id/unfollow", authMiddleware, unfollowUser);
router.get("/:id/posts", authMiddleware, getUserPosts);

export default router;
