import type { SocialProviders } from 'better-auth/social-providers';
import type { SocialAuthProvider } from '@/types/Auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { stripe } from '@better-auth/stripe';
import { emailHarmony } from 'better-auth-harmony';
import { betterAuth } from 'better-auth/minimal';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP, twoFactor } from 'better-auth/plugins';
import { customAlphabet } from 'nanoid';
import ExistingUserSignupEmail from '@/emails/auth/ExistingUserSignupEmail';
import ForgotPasswordOtpEmail from '@/emails/auth/ForgotPasswordOtpEmail';
import VerifyNewEmailOtpEmail from '@/emails/auth/VerifyNewEmailOtpEmail';
import VerifySignupOtpEmail from '@/emails/auth/VerifySignupOtpEmail';
import { logger } from '@/libs/Logger';
import { getUserByEmail } from '@/services/AuthService';
import { sendEmail } from '@/services/EmailService';
import { AppConfig } from '@/utils/AppConfig';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';
import { getLocaleFromRequest } from '@/utils/Helpers.server';
import { PaidPlans } from '@/utils/PricingPlans';
import { db } from './DB';
import { Env } from './Env';
import { stripeClient } from './Stripe';

const generateOTPToken = customAlphabet('123456789ABCDEFGHIJKLMNPQRSTUVWXYZ', AppConfig.auth.OTPLength);

export const socialAuthProviders = ['google', 'github'] as const;

const socialProviders: Pick<SocialProviders, SocialAuthProvider> = {};

if (Env.GITHUB_CLIENT_ID && Env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: Env.GITHUB_CLIENT_ID,
    clientSecret: Env.GITHUB_CLIENT_SECRET,
  };
}

if (Env.GOOGLE_CLIENT_ID && Env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: Env.GOOGLE_CLIENT_ID,
    clientSecret: Env.GOOGLE_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
  appName: AppConfig.name, // Needed by two-factor plugin
  baseURL: getBaseUrl(),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: AppConfig.auth.minPasswordLength,
    onExistingUserSignUp: async (data, request) => {
      const locale = getLocaleFromRequest(request);
      const url = `${getBaseUrl()}${getI18nPath('/sign-in', locale)}`;

      logger.debug(`type: account-exists - recipient: ${data.user.email}`);

      await sendEmail(data.user.email, {
        Template: ExistingUserSignupEmail,
        props: { url, locale },
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 2 * 60, // Cache duration in seconds, 2 minutes
    },
    additionalFields: {
      signInProvider: {
        type: 'string',
        required: false,
        input: false,
      },
    },
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session, ctx) => {
          let signInProvider = 'credential';

          if (ctx?.path === '/callback/:id') {
            const providerId = ctx.params?.id;

            if (providerId && Object.hasOwn(socialProviders, providerId)) {
              signInProvider = providerId;
            }
          }

          return {
            data: {
              ...session,
              signInProvider,
            },
          };
        },
      },
    },
  },
  rateLimit: {
    enabled: Env.RATE_LIMIT_ENABLED,
    storage: 'database',
    customRules: {
      '/sign-in/*': {
        window: 60, // 1 minute
        max: 10,
      },
      '/sign-up/*': {
        window: 60, // 1 minute
        max: 3,
      },
      '/change-password/*': {
        window: 60, // 1 minute
        max: 3,
      },
      '/change-email/*': {
        window: 60, // 1 minute
        max: 3,
      },
    },
  },
  socialProviders,
  account: {
    accountLinking: {
      disableImplicitLinking: true,
    },
  },
  telemetry: {
    enabled: false,
  },
  experimental: {
    joins: true,
  },
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      expiresIn: AppConfig.auth.OTPExpiresInMinutes * 60,
      otpLength: AppConfig.auth.OTPLength,
      changeEmail: {
        enabled: true,
        verifyCurrentEmail: true,
      },
      generateOTP: (data) => {
        if (Env.OTP_TEST_MODE && data.email.includes('+test@')) {
          const devOtp = '0'.repeat(AppConfig.auth.OTPLength);

          return devOtp;
        }

        return generateOTPToken();
      },
      async sendVerificationOTP(data, ctx) {
        const locale = getLocaleFromRequest(ctx?.request);

        if (data.type === 'email-verification') {
          const existingUser = await getUserByEmail(data.email);

          /**
           * Better Auth allows signing up twice with the same email. The second
           * attempt doesn't create an account, but the user can still sign in with
           * the OTP, bypassing the normal sign-in flow. Skip sending the OTP once the email
           * is verified to prevent this.
           */
          if (existingUser?.emailVerified) {
            logger.debug(`Skipped OTP send - type: ${data.type} - verified recipient: ${data.email}`);
            return;
          }

          logger.debug(`OTP: ${data.otp} - type: ${data.type} - recipient: ${data.email}`);

          await sendEmail(data.email, {
            Template: VerifySignupOtpEmail,
            props: { code: data.otp, locale },
          });
          return;
        }

        if (data.type === 'forget-password') {
          logger.debug(`OTP: ${data.otp} - type: ${data.type} - recipient: ${data.email}`);

          await sendEmail(data.email, {
            Template: ForgotPasswordOtpEmail,
            props: { code: data.otp, locale },
          });
          return;
        }

        if (data.type === 'change-email') {
          logger.debug(`OTP: ${data.otp} - type: ${data.type} - recipient: ${data.email}`);

          await sendEmail(data.email, {
            Template: VerifyNewEmailOtpEmail,
            props: { code: data.otp, locale },
          });
          return;
        }

        throw new Error('Should never happen: OTP type not supported');
      },
    }),
    twoFactor({
      totpOptions: {
        digits: AppConfig.auth.TOTPLength,
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: Env.STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: false,
      subscription: {
        enabled: true,
        plans: PaidPlans,
        getCheckoutSessionParams: async () => {
          return {
            params: {
              saved_payment_method_options: {
                allow_redisplay_filters: ['always', 'limited', 'unspecified'],
              },
            },
          };
        },
      },
    }),
    emailHarmony(),
    nextCookies(),
  ],
});
