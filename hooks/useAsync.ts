import { useState } from "react";

const useAsync = <T>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const runAsync = async (fn: () => Promise<T> | T): Promise<T | undefined> => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await Promise.resolve(fn());
      setLoading(false);
      return result;
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
    setLoading(false);
    return undefined;
  };

  return { loading, error, runAsync };
};

export default useAsync;
