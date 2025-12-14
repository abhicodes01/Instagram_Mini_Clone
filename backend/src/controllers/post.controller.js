import Post from "../models/Post.model.js";
import User from "../models/User.model.js";

export const createPost = async(req,res) =>{
    try {
        const {imageUrl, caption} = req.body

        if(!imageUrl){
            return res.status(400).json({message:"Image URL is required"})
        }

        const post = await Post.create({
            user: req.userId,
            imageUrl,
            caption,
        })
        
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

export const toggleLikePost = async(req,res)=>{
    try {
        const postId = req.params.id
        const userId = req.userId

        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message: "post not found"})
        }

        const alreadyLiked = post.likes.includes(userId)

        if(alreadyLiked){
            post.likes = post.likes.filter(
                (id)=> id.toString()!== userId
            )
        }
        else{
            post.likes.push(userId)
        }

        await post.save()

        res.json({
            message: alreadyLiked ? "Post Unliked" : "Post Liked",
            likesCount: post.likes.length
        })
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

export const getFeed = async(req, res) =>{
    try {
        const user = await User.findById(req.userId)
        const posts = await Post.find({
            user: {$in: user.following},
        }).populate("user", "name email").sort({createdAt: -1})

        res.json(posts)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

