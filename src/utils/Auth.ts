import type { Session } from '@/types/Auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth, socialAuthProviders } from '@/libs/Auth';
import { AppConfig } from '@/utils/AppConfig';

/**
 * Requires an authenticated session for the current request.
 * @param freshSession Forces a fresh session lookup when true.
 * @returns The authenticated session.
 * @throws {redirect} Redirects to Sign In page when no session is available.
 */
export const requireAuth = async (freshSession?: boolean): Promise<Session> => {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: freshSession },
  });

  if (!session) {
    redirect('/sign-in');
  }

  return session;
};

/**
 * Checks whether the session was created recently enough to count as a fresh sign-in.
 * Use to gate sensitive actions.
 * @param session The authenticated session.
 * @returns Whether the session is fresh.
 */
export const isFreshSession = (session: Session) => {
  const createdAtMs = new Date(session.session.createdAt).getTime();
  const freshAuthWindowMs = AppConfig.auth.freshAuthWindowMinutes * 60 * 1000;

  return Date.now() - createdAtMs <= freshAuthWindowMs;
};

/**
 * Narrows a session's sign-in provider string to a known social provider.
 * @param signInProvider The sign-in provider stored on the session.
 * @returns The social auth provider, or undefined for non-social providers.
 */
export const toSocialProvider = (signInProvider?: string | null) => {
  return socialAuthProviders.find(provider => provider === signInProvider);
};

/**
 * Checks whether the current user can sign in with a password.
 */
export const hasPasswordAuth = async () => {
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  return accounts.some(account => account.providerId === 'credential');
};
