import { useState, useEffect } from 'react';
import { getCategories }      from '../../services/';

export function useCategories() {
  const [cats, setCats]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(res => setCats(res.data.data))
      .finally(()=> setLoading(false));
  }, []);

  return { cats, loading };
}