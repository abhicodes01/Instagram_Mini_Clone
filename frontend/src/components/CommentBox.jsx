import { useEffect, useState } from "react";
import { addComment, getComments } from "../api/comment.api";

const CommentBox = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getComments(postId).then((res) => setComments(res.data));
  }, [postId]);

  const handleAddComment = async () => {
  if (!text.trim()) return;

  console.log("Posting comment:", text);

  const res = await addComment(postId, text);

  console.log("Comment response:", res.data);

  setComments((prev) => [...prev, res.data]);
  setText("");
};


  const visibleComments = showAll
    ? comments
    : comments.slice(0, 2);

  return (
    <div className="mt-3 text-sm">
      {/* Show comments */}
      {visibleComments.map((c) => (
        <p key={c._id}>
          <span className="font-semibold mr-1">
            {c.user.name}
          </span>
          {c.text}
        </p>
      ))}

      {/* Show more */}
      {comments.length > 2 && !showAll && (
        <button
          className="text-gray-500 text-xs mt-1"
          onClick={() => setShowAll(true)}
        >
          View all {comments.length} comments
        </button>
      )}

      {/* Add comment */}
      <div className="flex items-center gap-2 mt-2">
        <input
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="text-blue-500 text-sm font-semibold"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
