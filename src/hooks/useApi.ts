import { useCallback, useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  headers?: Record<string, string>;
}

export function useFetch<T = any>(
  url: string,
  options?: UseApiOptions
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.get<T>(url, { 
        headers: options?.headers 
      });
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err);
      options?.onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { data, loading, error, fetch };
}

export function usePost<T = any>(options?: UseApiOptions) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const post = useCallback(
    async (url: string, data?: any) => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await apiClient.post<T>(url, data, { 
          headers: options?.headers 
        });
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        setError(err);
        options?.onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  return { loading, error, post };
}
