import { useEffect, useState } from 'react';
export function usePersistedState(key, initial, validate = () => true) {
  const [state, setState] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem(key)); return saved !== null && validate(saved) ? saved : initial; } catch { return initial; }
  });
  const [storageError, setStorageError] = useState(false);
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(state)); setStorageError(false); } catch { setStorageError(true); } }, [key, state]);
  return [state, setState, storageError];
}
export const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
