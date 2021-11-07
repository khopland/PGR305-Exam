import { useState } from 'react';

// Hook
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevState: T) => T)) => boolean] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prevState: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return [storedValue, setValue];
}
