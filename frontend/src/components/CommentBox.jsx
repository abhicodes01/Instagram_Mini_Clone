import { useEffect, useState } from "react";
import { addComment, getComments } from "../api/comment.api";

const CommentBox = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getComments(postId).then((res) => setComments(res.data));
  }, [postId]);

  const handleAdd = async () => {
    const res = await addComment(postId, text);
    setComments([...comments, res.data]);
    setText("");
  };

  return (
    <div className="mt-3">
      {comments.map((c) => (
        <p key={c._id} className="text-sm">
          <span className="font-semibold">{c.user.name}</span>:{" "}
          {c.text}
        </p>
      ))}

      <div className="flex mt-2 gap-2">
        <input
          className="border p-1 flex-1"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAdd}>Post</button>
      </div>
    </div>
  );
};

export default CommentBox;
