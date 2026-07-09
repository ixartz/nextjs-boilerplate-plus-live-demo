'use client';

import type { useTranslations } from 'next-intl';
import type messages from '@/locales/en.json';

/**
 * Converts Better Auth errors into localized, user-friendly error messages.
 * @param tBetterAuthError Translation function scoped to the 'BetterAuthError' namespace.
 * @param error Error object returned by Better Auth.
 * @param error.code Optional. Better Auth error code.
 * @param error.status HTTP status code (e.g., 401, 429, 500).
 * @returns A localized error message. Falls back to 'UNKNOWN_ERROR' for unrecognized codes.
 */
export const getAuthErrorMessage = (tBetterAuthError: ReturnType<typeof useTranslations<'BetterAuthError'>>, error: {
  code?: string;
  status?: number;
}) => {
  if (error.status === 429) {
    return tBetterAuthError('TOO_MANY_REQUESTS');
  }

  const code = error.code as keyof (typeof messages)['BetterAuthError'];

  if (!code || !tBetterAuthError.has(code)) {
    if (error.status === 400) {
      return tBetterAuthError('BAD_REQUEST');
    }

    return tBetterAuthError('UNKNOWN_ERROR');
  }

  return tBetterAuthError(code);
};
