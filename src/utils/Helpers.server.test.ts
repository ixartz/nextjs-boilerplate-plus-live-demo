import { describe, expect, it } from 'vitest';
import { routing } from '@/libs/I18nRouting';
import { getLocaleFromRequest } from './Helpers.server';

const requestWithReferer = (referer: string) =>
  new Request('https://example.com/api/auth', { headers: { referer } });

describe('Helpers.server', () => {
  describe('getLocaleFromRequest', () => {
    it('returns default locale without a request', () => {
      expect(getLocaleFromRequest()).toBe(routing.defaultLocale);
      expect(getLocaleFromRequest(undefined)).toBe(routing.defaultLocale);
    });

    it('returns default locale without a Referer header', () => {
      const request = new Request('https://example.com/api/auth');

      expect(getLocaleFromRequest(request)).toBe(routing.defaultLocale);
    });

    it('returns default locale for an empty Referer', () => {
      expect(getLocaleFromRequest(requestWithReferer(''))).toBe(routing.defaultLocale);
    });

    it('returns default locale for a malformed Referer', () => {
      expect(getLocaleFromRequest(requestWithReferer('garbage'))).toBe(routing.defaultLocale);
      expect(getLocaleFromRequest(requestWithReferer('http://'))).toBe(routing.defaultLocale);
      expect(getLocaleFromRequest(requestWithReferer('://missing-scheme.com'))).toBe(routing.defaultLocale);
      expect(getLocaleFromRequest(requestWithReferer('about:blank'))).toBe(routing.defaultLocale);
    });

    it('returns default locale for a relative Referer path', () => {
      expect(getLocaleFromRequest(requestWithReferer('/fr/sign-up'))).toBe('fr');
    });

    it('returns locale from a localized Referer path', () => {
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/fr/sign-up'))).toBe('fr');
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/fr'))).toBe('fr');
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/fr/'))).toBe('fr');
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/fr/dashboard/settings'))).toBe('fr');
    });

    it('returns default locale from a non-prefixed Referer path', () => {
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/sign-up'))).toBe(routing.defaultLocale);
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/'))).toBe(routing.defaultLocale);
      expect(getLocaleFromRequest(requestWithReferer('https://example.com'))).toBe(routing.defaultLocale);
    });

    it('returns default locale for an unknown locale prefix', () => {
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/xx/sign-up'))).toBe(routing.defaultLocale);
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/free/sign-up'))).toBe(routing.defaultLocale);
    });

    it('normalizes an uppercase locale prefix', () => {
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/FR/sign-up'))).toBe('fr');
    });

    it('ignores query and hash in the Referer', () => {
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/fr/sign-up?redirect=%2Fdashboard#form'))).toBe('fr');
      expect(getLocaleFromRequest(requestWithReferer('https://example.com/fr?utm_source=email'))).toBe('fr');
    });

    it('ignores origin, port and credentials in the Referer', () => {
      expect(getLocaleFromRequest(requestWithReferer('http://localhost:3000/fr/sign-up'))).toBe('fr');
      expect(getLocaleFromRequest(requestWithReferer('https://user:pass@other.example.org:8443/fr/sign-up'))).toBe('fr');
    });
  });
});
