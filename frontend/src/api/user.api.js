import axiosInstance from "./axiosInstance";

export const followUser = (id) =>
  axiosInstance.post(`/users/${id}/follow`);

export const unfollowUser = (id) =>
  axiosInstance.post(`/users/${id}/unfollow`);

export const getUserPosts = (id) =>
  axiosInstance.get(`/users/${id}/posts`);

export const searchUsers = (query) =>
  axiosInstance.get(`/users/search?q=${query}`);

export const getUserProfile = (id) =>
  axiosInstance.get(`/users/${id}/profile`);


