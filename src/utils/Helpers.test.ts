import { describe, expect, it } from 'vitest';
import { routing } from '@/libs/I18nRouting';
import { getI18nPath, mapLocaleToStripe, parseI18nPath, safeRedirect } from './Helpers';

describe('Helpers', () => {
  describe('I18n path helper', () => {
    it('keeps path unchanged when locale is default', () => {
      const url = '/random-url';
      const locale = routing.defaultLocale;

      expect(getI18nPath(url, locale)).toBe(url);
    });

    it('prefixes path with locale when locale is not default', () => {
      const url = '/random-url';
      const locale = 'fr';

      expect(getI18nPath(url, locale)).toBe(`/fr${url}`);
    });
  });

  describe('parseI18nPath', () => {
    it('parses the root', () => {
      expect(parseI18nPath('/')).toEqual({
        locale: routing.defaultLocale,
        firstSegment: '',
        normalizedPath: '/',
      });
    });

    it('parses single-segment path', () => {
      expect(parseI18nPath('/dashboard')).toEqual({
        locale: routing.defaultLocale,
        firstSegment: 'dashboard',
        normalizedPath: '/dashboard',
      });
    });

    it('parses nested path', () => {
      expect(parseI18nPath('/dashboard/settings')).toEqual({
        locale: routing.defaultLocale,
        firstSegment: 'dashboard',
        normalizedPath: '/dashboard/settings',
      });
    });

    it('parses localized root path', () => {
      expect(parseI18nPath('/fr')).toEqual({
        locale: 'fr',
        firstSegment: '',
        normalizedPath: '/',
      });
    });

    it('parses localized root path with trailing slash', () => {
      expect(parseI18nPath('/fr/')).toEqual({
        locale: 'fr',
        firstSegment: '',
        normalizedPath: '/',
      });
    });

    it('parses nested localized path', () => {
      expect(parseI18nPath('/fr/dashboard/settings')).toEqual({
        locale: 'fr',
        firstSegment: 'dashboard',
        normalizedPath: '/dashboard/settings',
      });
    });

    it('parses path with unknown locale', () => {
      expect(parseI18nPath('/xx/dashboard')).toEqual({
        locale: routing.defaultLocale,
        firstSegment: 'xx',
        normalizedPath: '/xx/dashboard',
      });
    });

    it('parses localized path with uppercase locale', () => {
      expect(parseI18nPath('/FR/dashboard')).toEqual({
        locale: 'fr',
        firstSegment: 'dashboard',
        normalizedPath: '/dashboard',
      });
    });

    it('parses path with trailing slash', () => {
      expect(parseI18nPath('/fr/dashboard/settings/')).toEqual({
        locale: 'fr',
        firstSegment: 'dashboard',
        normalizedPath: '/dashboard/settings',
      });
    });
  });

  describe('safeRedirect', () => {
    it('returns valid relative paths unchanged', () => {
      expect(safeRedirect('/dashboard')).toBe('/dashboard');
      expect(safeRedirect('/')).toBe('/');
      expect(safeRedirect('/dashboard/settings/profile')).toBe('/dashboard/settings/profile');
      expect(safeRedirect('/dashboard?tab=settings')).toBe('/dashboard?tab=settings');
      expect(safeRedirect('/dashboard#section')).toBe('/dashboard#section');
      expect(safeRedirect('/search?q=test#results')).toBe('/search?q=test#results');
      expect(safeRedirect('/path//double')).toBe('/path//double');
      expect(safeRedirect('/dashboard/')).toBe('/dashboard/');
    });

    it('prioritizes valid URL over custom fallback', () => {
      expect(safeRedirect('/dashboard', '/fallback')).toBe('/dashboard');
      expect(safeRedirect('/dashboard/settings', '/fallback')).toBe('/dashboard/settings');
      expect(safeRedirect('/', '/fallback')).toBe('/');
      expect(safeRedirect('/search?q=test', '/fallback')).toBe('/search?q=test');
    });

    it('returns fallback for invalid or unsafe URLs', () => {
      expect(safeRedirect(null)).toBe('/dashboard');
      expect(safeRedirect('')).toBe('/dashboard');
      expect(safeRedirect('//evil.com')).toBe('/dashboard');
      expect(safeRedirect('//evil.com/path')).toBe('/dashboard');
      expect(safeRedirect('https://evil.com')).toBe('/dashboard');
      expect(safeRedirect('http://evil.com')).toBe('/dashboard');
      expect(safeRedirect('javascript:alert(1)')).toBe('/dashboard');
      expect(safeRedirect('data:text/html,<script>alert(1)</script>')).toBe('/dashboard');
      expect(safeRedirect('dashboard')).toBe('/dashboard');
      expect(safeRedirect(' /dashboard')).toBe('/dashboard');
      expect(safeRedirect('mailto:test@example.com')).toBe('/dashboard');
      expect(safeRedirect('tel:+1234567890')).toBe('/dashboard');
      expect(safeRedirect('ftp://files.example.com')).toBe('/dashboard');
      expect(safeRedirect('file:///etc/passwd')).toBe('/dashboard');
      expect(safeRedirect('//evil.com\\@good.com')).toBe('/dashboard');
      expect(safeRedirect('///evil.com')).toBe('/dashboard');
      expect(safeRedirect('%2F%2Fevil.com')).toBe('/dashboard');
      expect(safeRedirect('//evil.com%00')).toBe('/dashboard');
      expect(safeRedirect('//evil.com:80')).toBe('/dashboard');
    });

    it('uses custom fallback for invalid inputs', () => {
      expect(safeRedirect(null, '/fallback')).toBe('/fallback');
      expect(safeRedirect('https://evil.com', '/fallback')).toBe('/fallback');
      expect(safeRedirect('', '/fallback')).toBe('/fallback');
    });
  });

  describe('mapLocaleToStripe', () => {
    it('returns auto for unknown locales', () => {
      expect(mapLocaleToStripe('unknown')).toBe('auto');
      expect(mapLocaleToStripe('xx')).toBe('auto');
      expect(mapLocaleToStripe('zz')).toBe('auto');
      expect(mapLocaleToStripe('')).toBe('auto');
    });
  });
});
