import { useState } from "react";
import { createPost } from "../api/post.api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ imageUrl, caption });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded space-y-4"
      >
        <h2 className="text-xl font-bold">Create Post</h2>

        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <textarea
          placeholder="Caption"
          className="w-full border p-2"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
