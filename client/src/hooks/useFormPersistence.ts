import { useState, useEffect } from 'react';

export function useFormPersistence<T extends Record<string, any>>(
  key: string,
  initialData: T,
  options: {
    storage?: 'local' | 'session';
    debounceMs?: number;
  } = {}
) {
  const { storage = 'local', debounceMs = 1000 } = options;
  const storageApi = storage === 'local' ? localStorage : sessionStorage;

  // Initialize state from storage or initial data
  const [data, setData] = useState<T>(() => {
    const saved = storageApi.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialData;
      }
    }
    return initialData;
  });

  // Save to storage with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      storageApi.setItem(key, JSON.stringify(data));
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [data, key, storageApi, debounceMs]);

  const updateData = (newData: Partial<T> | ((prev: T) => T)) => {
    setData(prev => {
      if (typeof newData === 'function') {
        return newData(prev);
      }
      return { ...prev, ...newData };
    });
  };

  const clearData = () => {
    storageApi.removeItem(key);
    setData(initialData);
  };

  return { data, updateData, clearData, setData };
}

export type FormPersistenceReturn<T extends Record<string, any>> = ReturnType<typeof useFormPersistence<T>>;
