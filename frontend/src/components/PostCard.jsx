import { useState } from "react";
import { likePost } from "../api/post.api";
import CommentBox from "./CommentBox";

const PostCard = ({ post }) => {
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLike = async () => {
    const res = await likePost(post._id);
    setLikesCount(res.data.likesCount);
  };

  return (
    <div className="w-full max-w-md bg-white border rounded-lg shadow-sm mx-auto">
      {/* Header */}
      <div className="px-4 py-3 font-semibold border-b">
        {post.user.name}
      </div>

      {/* Image wrapper with fixed aspect ratio */}
      <div className="w-full aspect-square bg-black">
        <img
          src={post.imageUrl}
          alt="post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <button
          onClick={handleLike}
          className="text-lg hover:scale-110 transition"
        >
          ❤️
        </button>
        <span className="ml-2 text-sm">{likesCount} likes</span>

        {post.caption && (
          <p className="mt-2 text-sm">
            <span className="font-semibold mr-1">
              {post.user.name}
            </span>
            {post.caption}
          </p>
        )}

        <CommentBox postId={post._id} />
      </div>
    </div>
  );
};

export default PostCard;
