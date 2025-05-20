import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/Blog-App/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// —— Categorías —— //
export const getCategories    = () => API.get('/categories');
export const createCategory   = data => API.post('/categories', data);
export const updateCategory   = (id, data) => API.put(`/categories/${id}`, data);
export const deactivateCategory = id => API.delete(`/categories/${id}`);

// —— Posts —— //
export const getPosts         = categoryId =>
  API.get('/posts', { params: categoryId ? { category: categoryId } : {} });
export const getPostById      = id => API.get(`/posts/${id}`);
export const createPost       = data => API.post('/posts', data);
export const updatePost       = (id, data) => API.put(`/posts/${id}`, data);
export const deactivatePost   = id => API.delete(`/posts/${id}`);

// —— Comentarios —— //
export const createComment    = (postId, data) =>
  API.post(`/posts/${postId}/comments`, data);
export const updateComment  = (postId, id, data) =>
  API.put(`/posts/${postId}/comments/${id}`, data);
export const deleteComment  = (postId, id) =>
  API.delete(`/posts/${postId}/comments/${id}`);

export default {
  getCategories,
  createCategory,
  updateCategory,
  deactivateCategory,
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deactivatePost,
  createComment
};
