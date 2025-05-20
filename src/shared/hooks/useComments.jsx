import { useState, useEffect } from 'react';
import {
  createComment,
  getPostById,
  updateComment,
  deleteComment
} from '../../services/';

export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading,  setLoading]  = useState(true);

  const fetch = () => {
    setLoading(true);
    getPostById(postId)
      .then(res => setComments(res.data.data.comments))
      .finally(() => setLoading(false));
  };

  useEffect(fetch, [postId]);

  const add = async data => {
    await createComment(postId, data);
    fetch();
  };

  const update = async (commentId, data) => {
    await updateComment(postId, commentId, data);
    fetch();
  };

  const remove = async commentId => {
    await deleteComment(postId, commentId);
    fetch();
  };

  return {
    comments,
    loading,
    add,
    update,
    remove
  };
}
