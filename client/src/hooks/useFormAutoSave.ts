import { useEffect, useRef } from 'react';
import { useFormPersistence } from './useFormPersistence';

interface AutoSaveOptions {
  key: string;
  debounceMs?: number;
  storage?: 'local' | 'session';
  onSave?: () => void;
}

export function useFormAutoSave<T extends Record<string, any>>(
  formData: T,
  options: AutoSaveOptions
) {
  const { key, debounceMs = 1000, storage = 'local', onSave } = options;
  const { updateData, clearData } = useFormPersistence(key, formData, { storage, debounceMs });
  const initialLoadRef = useRef(true);

  // Auto-save when form data changes
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    updateData(formData);
    onSave?.();
  }, [formData, updateData, onSave]);

  // Clear saved data when component unmounts
  useEffect(() => {
    return () => {
      clearData();
    };
  }, [clearData]);

  return {
    clearSavedData: clearData
  };
}
