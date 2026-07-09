import type { SessionStorageKey } from '@/types/SessionStorage';
import { isBrowser } from './Helpers';

/**
 * Use `getSessionStorage` for values that aren't rendered in the UI (e.g., in event handlers).
 * If you need to render the value, use the `useSessionStorage` hook instead.
 * @param key The session storage key
 * @returns The session storage value
 */
export const getSessionStorage = (key: SessionStorageKey) => {
  if (!isBrowser()) {
    return '';
  }

  return sessionStorage.getItem(key) ?? '';
};

/**
 * Sets a value in `sessionStorage`, SSR-safe.
 * @param key The session storage key
 * @param value The value to store
 */
export const setSessionStorage = (key: SessionStorageKey, value: string) => {
  if (!isBrowser()) {
    return;
  }

  sessionStorage.setItem(key, value);
};

/**
 * Removes a value from `sessionStorage`, SSR-safe.
 * @param key The session storage key to remove
 */
export const removeSessionStorage = (key: SessionStorageKey) => {
  if (!isBrowser()) {
    return;
  }

  sessionStorage.removeItem(key);
};

/**
 * Reads a value from `sessionStorage` and removes the key afterwards.
 * Useful for one-time values.
 * @param key The session storage key to read and remove
 * @returns The session storage value
 */
export const popSessionStorage = (key: SessionStorageKey) => {
  const value = getSessionStorage(key);
  removeSessionStorage(key);
  return value;
};
