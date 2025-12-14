import axiosInstance from "./axiosInstance";

export const addComment = (postId, text) =>
  axiosInstance.post(`/posts/${postId}/comment`, { text });

export const getComments = (postId) =>
  axiosInstance.get(`/posts/${postId}/comments`);
