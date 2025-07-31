import { useState } from 'react';

export function usePostData(apiUrl) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createData(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao criar');
      return await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { createData, loading, error };
}