import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  followUser,
  unfollowUser,
  getUserProfile,
} from "../api/user.api";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { id } = useParams();
  const { user: loggedInUser } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Fetch profile info
    getUserProfile(id).then((res) => {
      setProfileUser(res.data.user);
      setIsFollowing(res.data.isFollowing);
    });

    // Fetch posts
    axiosInstance
      .get(`/users/${id}/posts`)
      .then((res) => setPosts(res.data));
  }, [id]);

  const handleFollow = async () => {
  try {
    if (isFollowing) {
      const res = await unfollowUser(id);

      setProfileUser((prev) => ({
        ...prev,
        followers: prev.followers.slice(0, res.data.followersCount),
      }));
    } else {
      const res = await followUser(id);

      setProfileUser((prev) => ({
        ...prev,
        followers: Array(res.data.followersCount).fill("x"),
      }));
    }

    setIsFollowing(!isFollowing);
  } catch (err) {
    console.error(err);
  }
};


  if (!profileUser) return null;

  return (
    <div className="max-w-xl mx-auto mt-6">
      {/* Profile Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{profileUser.name}</h2>

          <div className="flex gap-4 text-sm mt-1">
            <span>
              <b>{posts.length}</b> posts
            </span>
            <span>
              <b>{profileUser.followers.length}</b> followers
            </span>
            <span>
              <b>{profileUser.following.length}</b> following
            </span>
          </div>
        </div>

        {loggedInUser?.id !== String(id) && (

          <button
            onClick={handleFollow}
            className={`px-4 py-1 rounded border ${
              isFollowing
                ? "bg-gray-200"
                : "bg-blue-500 text-white"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        {posts.map((p) => (
          <img
            key={p._id}
            src={p.imageUrl}
            className="aspect-square object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
