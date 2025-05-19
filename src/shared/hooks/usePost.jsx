import { useState, useEffect } from 'react';
import { getPostById }         from '../../services/';

export function usePost(id) {
  const [post, setPost]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostById(id)
      .then(res => setPost(res.data.data.post))
      .finally(()=> setLoading(false));
  }, [id]);

  return { post, loading };
}
