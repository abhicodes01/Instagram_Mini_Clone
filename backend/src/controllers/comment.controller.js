import Comment from "../models/Comment.model.js"
import Post from "../models/Post.model.js"

export const addComment = async(req,res)=>{
    try {
        const {text} = req.body
        const postId = req.params.id

        if(!text){
            return res.status(400).json({message: " Comment text is required"})
        }

        const postExists = await Post.findById(postId)
        if(!postExists){
            return res.status(404).json({message: "post not found"})
        }

        const comment = await Comment.create({
            post: postId,
            user: req.userId,
            text,
        })

        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

export const getCommentsByPost = async (req, res)=>{
    try {
        const postId = req.params.id

        const comments = await Comment.find({post:postId}).populate("user", "name email").sort({created: 1})
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
}