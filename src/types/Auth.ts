import type { auth, socialAuthProviders } from '@/libs/Auth';

export type Session = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

export type SubscriptionList = Awaited<ReturnType<typeof auth.api.listActiveSubscriptions>>;
export type Subscription = SubscriptionList[number];

export type MfaSetupData = {
  totpURI: string;
  backupCodes: string[];
};

export const REDIRECT_URL_COOKIE_NAME = 'redirect-url';

export type SocialAuthProvider = typeof socialAuthProviders[number];
