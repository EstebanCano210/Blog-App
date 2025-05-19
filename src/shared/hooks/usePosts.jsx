import { useState, useEffect } from 'react';
import { getPosts }            from '../../services/';

export function usePosts(categoryId) {
  const [posts, setPosts]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPosts(categoryId)
      .then(res => setPosts(res.data.data))
      .finally(()=> setLoading(false));
  }, [categoryId]);

  return { posts, loading };
}