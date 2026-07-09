import type { auth } from './Auth';
import { stripeClient } from '@better-auth/stripe/client';
import { emailOTPClient, inferAdditionalFields, twoFactorClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    twoFactorClient(),
    stripeClient({
      subscription: true,
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});
