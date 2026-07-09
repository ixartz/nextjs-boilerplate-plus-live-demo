import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Env } from '@/libs/Env';
import { routing } from '@/libs/I18nRouting';
import { AppConfig } from './AppConfig';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves the public base URL of the application.
 * @returns The configured public app URL or the local development URL.
 */
export const getBaseUrl = () => {
  if (Env.NEXT_PUBLIC_APP_URL) {
    return Env.NEXT_PUBLIC_APP_URL;
  }

  return 'http://localhost:3000';
};

/**
 * Builds a locale-aware path by prefixing non-default locales.
 * @param url The base application-relative path starting with a slash.
 * @param locale The active locale identifier.
 * @returns The localized path, prefixed when the locale is not the default locale.
 */
export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

export const isServer = () => {
  return typeof window === 'undefined';
};

export const isBrowser = () => {
  return typeof window !== 'undefined';
};

/**
 * Validates and sanitizes a redirect URL, only allowing relative paths within the application.
 * @param url The raw URL string.
 * @param fallbackUrl The fallback URL to use if validation fails.
 */
export function safeRedirect(url?: string | null, fallbackUrl: string = '/dashboard') {
  if (url && url.startsWith('/') && !url.startsWith('//')) {
    return url;
  }

  return fallbackUrl;
}

/**
 * Parses a pathname into locale-aware routing segments.
 * @param pathname The pathname to parse.
 * @returns An object containing the locale, the first non-locale path segment, and the path without the locale prefix.
 */
export const parseI18nPath = (pathname: string) => {
  const segments = pathname.slice(1).split('/').filter(Boolean);

  const first = segments[0]?.toLowerCase();
  const isKnownLocale = Boolean(first && routing.locales.includes(first));
  const locale = first && isKnownLocale ? first : routing.defaultLocale;

  if (isKnownLocale) {
    segments.shift();
  }

  const firstSegment = segments[0] ?? '';
  return { locale, firstSegment, normalizedPath: `/${segments.join('/')}` };
};

/**
 * Maps an application locale identifier to a Stripe-compatible locale identifier.
 * @param locale The locale identifier.
 * @returns The matching Stripe locale code, or 'auto' as a fallback.
 */
export const mapLocaleToStripe = (locale: string) => {
  const stripeLocale = AppConfig.i18n.locales.find(elt => elt.id === locale)?.stripeLocale;
  const fallback = 'auto';

  return stripeLocale ?? fallback;
};

/**
 * Generates a deterministic 32-bit hash from a string using FNV-1a algorithm.
 * @param value The string to hash.
 * @returns An unsigned 32-bit integer hash.
 */
export const hashStringToIndex = (value: string) => {
  let hash = 0x811C9DC5; // FNV-1a 32-bit offset basis

  for (const byte of new TextEncoder().encode(value)) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193); // FNV-1a 32-bit prime
  }

  return hash >>> 0;
};

// Skip rose, zinc, and neutral shades to keep palette contrast
export const AVATAR_BACKGROUND_COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-slate-500',
  'bg-gray-500',
  'bg-stone-500',
] as const;
