import { routing } from '@/libs/I18nRouting';
import { parseI18nPath } from './Helpers';

/**
 * Derives the active locale from a server request.
 * Reads the locale from the `Referer` path and falls back to the default locale
 * when the header is missing or malformed (e.g. non-browser clients).
 * @param request Optional. The incoming request.
 * @returns The detected locale identifier.
 */
export const getLocaleFromRequest = (request?: Request) => {
  const referer = request?.headers.get('referer');

  if (!referer) {
    return routing.defaultLocale;
  }

  const pathname = URL.parse(referer, request?.url)?.pathname;

  if (!pathname) {
    return routing.defaultLocale;
  }

  return parseI18nPath(pathname).locale;
};
