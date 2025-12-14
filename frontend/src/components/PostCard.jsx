import { likePost } from "../api/post.api";
import CommentBox from "./CommentBox";

const PostCard = ({ post }) => {
  const handleLike = async () => {
    await likePost(post._id);
  };

  return (
    <div className="border rounded">
      <img src={post.imageUrl} className="w-full" />

      <div className="p-4">
        <p className="font-semibold">{post.user.name}</p>
        <p>{post.caption}</p>

        <button onClick={handleLike} className="mt-2">
          ❤️ {post.likes.length}
        </button>

        <CommentBox postId={post._id} />
      </div>
    </div>
  );
};

export default PostCard;
