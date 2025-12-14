import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { followUser, unfollowUser } from "../api/user.api";
import axiosInstance from "../api/axiosInstance";

const Profile = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/users/${id}/posts`)
      .then((res) => setPosts(res.data));
  }, [id]);

  const toggleFollow = async () => {
    if (isFollowing) {
      await unfollowUser(id);
    } else {
      await followUser(id);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Profile</h2>
        <button
          onClick={toggleFollow}
          className="border px-4 py-1"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {posts.map((p) => (
          <img key={p._id} src={p.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
