import { describe, expect, it } from 'vitest';
import { SESSION_STORAGE_KEY } from '@/types/SessionStorage';
import { getSessionStorage, popSessionStorage, setSessionStorage } from './SessionStorage';

describe('SessionStorage', () => {
  describe('popSessionStorage', () => {
    it('returns stored value when key exists', () => {
      setSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL, 'reset@example.com');

      const result = popSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL);

      expect(result).toBe('reset@example.com');
    });

    it('removes key after reading value', () => {
      setSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL, 'reset@example.com');

      popSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL);

      expect(getSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL)).toBe('');
    });

    it('returns empty string when key does not exist', () => {
      const result = popSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL);

      expect(result).toBe('');
    });

    it('returns empty string on subsequent calls for same key', () => {
      setSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION, 'test@example.com');

      const firstResult = popSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION);
      const secondResult = popSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION);

      expect(firstResult).toBe('test@example.com');
      expect(secondResult).toBe('');
    });

    it('preserves other keys when popping one key', () => {
      setSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL, 'reset@example.com');
      setSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION, 'test@example.com');

      popSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL);

      expect(getSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION)).toBe('test@example.com');
    });
  });
});
