import axiosInstance from "./axiosInstance";

export const getComments = (postId) =>
  axiosInstance.get(`/posts/${postId}/comments`);

export const addComment = (postId, text) =>
  axiosInstance.post(`/posts/${postId}/comment`, { text });
