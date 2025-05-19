import { useState, useEffect } from 'react';
import { createComment,
         getPostById } from '../../services/';

export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(true);

  const fetch = () => {
    setLoading(true);
    getPostById(postId)
      .then(res => setComments(res.data.data.comments))
      .finally(()=> setLoading(false));
  };

  useEffect(fetch, [postId]);

  const add = async data => {
    await createComment(postId, data);
    fetch();
  };

  return { comments, loading, add };
}
