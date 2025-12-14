import axiosInstance from "./axiosInstance";

export const getFeed = () => axiosInstance.get("/posts/feed")
export const likePost = (id) =>
    axiosInstance.post(`/posts/${id}/like`)

export const createPost = (data) =>
  axiosInstance.post("/posts", data);