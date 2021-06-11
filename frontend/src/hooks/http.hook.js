import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      setError(null);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);
      try {
        const res = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal,
        });
        const resData = await res.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortController
        );

        if (!res.ok) {
          throw new Error(resData.message);
        }

        setLoading(false);
        return resData;
      } catch (e) {
        setError(e.message);
        setLoading(false);
        throw e;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return {
    loading,
    error,
    sendRequest,
  };
};
