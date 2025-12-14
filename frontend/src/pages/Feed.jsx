import { useEffect, useState } from "react";
import { getFeed } from "../api/post.api";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);

useEffect(() => {
  getFeed()
    .then((res) => setPosts(res.data))
    .catch((err) => {
      if (err.response?.status === 401) {
        console.log("Unauthorized, redirecting to login");
      }
    });
}, []);


  return (
    <div className="max-w-xl mx-auto mt-6 space-y-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
