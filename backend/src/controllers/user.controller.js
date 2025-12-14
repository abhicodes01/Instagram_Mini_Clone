import User from "../models/User.model.js";
import Post from "../models/Post.model.js";

export const followUser = async(req,res) =>{
    try {
        const userId = req.userId
        const targetUserId = req.params.userId

        if(userId===targetUserId){
            return res.status(400).json({message: "You cannot follow yourself"})
        }

        const user = await User.findById(userId)
        const targetUser = await User.findById(targetUserId)

        if(!targetUser){
            return res.status(404).json({message: "User not found"})
        }

        user.following.push(targetUserId)
        targetUser.followers.push(userId)

        await user.save()
        await targetUser.save()

        res.json({message: "User followed successfully"})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

export const unfollowUser = async(req,res)=>{
    try {
        const user = req.userId
        const targetUser = req.params.id

        if(!targetUser){
            return res.status(404).json({message:"User not founf"})
        }

        user.following = user.following.filter(
            (id) => id.toString() !== targetUserId
        )

        targetUser.followers = targetUser.followers.filter(
            (id) => id.toString() !== userId
        )

        await user.save()
        await targetUser.save()

        res.json({message: "User unfollowed successfully"})
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};