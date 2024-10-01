import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

// Taken from https://usehooks.ts/useLocalStorage/

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = (): T => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = value => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;
      const serializeState = JSON.stringify(newValue);

      // Save to local storage
      window.localStorage.setItem(key, serializeState);

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(
        new StorageEvent('storage', { key, newValue: serializeState })
      );
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      // We can also compare with e.newValue and not proceed ahead
      if (key !== e.key) return;
      setStoredValue(readValue());
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
}

export default useLocalStorage;
