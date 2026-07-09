import type { SessionStorageKey } from '@/types/SessionStorage';
import { useEffect, useState } from 'react';
import { getSessionStorage } from '@/utils/SessionStorage';

/**
 * SSR-safe sessionStorage read for UI.
 * @param key Session storage key to read.
 * @returns The session storage value.
 */
export const useSessionStorage = (
  key: SessionStorageKey,
) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    // Read after mount to avoid SSR hydration mismatch.
    // eslint-disable-next-line react/set-state-in-effect
    setValue(getSessionStorage(key));
  }, [key]);

  return value;
};
