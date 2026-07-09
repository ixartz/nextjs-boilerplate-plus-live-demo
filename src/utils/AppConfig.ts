import type { LocalePrefixMode } from 'next-intl/routing';
import type { AppLocale } from '@/types/I18n';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';

/** List of supported locales with display names and the matching Stripe locale. */
const locales = [
  {
    id: 'en',
    name: 'English',
    stripeLocale: 'en',
  },
  {
    id: 'fr',
    name: 'Français',
    stripeLocale: 'fr',
  },
] satisfies AppLocale[];

// FIXME: Customize this configuration for your product
/** Centralized application configuration */
export const AppConfig = {
  name: 'Next JS Boilerplate',
  sidebarCookieName: 'sidebar:state',
  i18n: {
    locales,
    defaultLocale: 'en',
    localePrefix,
  },
  email: {
    senderInfo: {
      name: 'Next.js Boilerplate',
      address: 'contact@max.nextjs-boilerplate.com',
    },
    support: 'contact@nextjs-boilerplate.com',
  },
  auth: {
    minPasswordLength: 8,
    OTPExpiresInMinutes: 30,
    OTPLength: 6,
    TOTPLength: 6,
    // Oauth session window for requiring re-authentication before sensitive operations
    freshAuthWindowMinutes: 10,
  },
} as const;

export const AllLocales = AppConfig.i18n.locales.map(locale => locale.id);
