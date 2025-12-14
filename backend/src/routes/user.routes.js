import express from "express";
import {
  followUser,
  unfollowUser,
  getUserPosts,
  searchUsers,
  getUserProfile
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id/follow", authMiddleware, followUser);
router.post("/:id/unfollow", authMiddleware, unfollowUser);
router.get("/:id/posts", authMiddleware, getUserPosts);
router.get("/search", authMiddleware, searchUsers);
router.get("/:id/profile", authMiddleware, getUserProfile);


export default router;
