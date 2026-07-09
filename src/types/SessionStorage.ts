import type { EnumValues } from './Enum';

export const SESSION_STORAGE_KEY = {
  EMAIL_CHANGE: 'email-change',
  EMAIL_VERIFICATION: 'email-verification',
  PASSWORD_RESET_EMAIL: 'password-reset-email',
} as const;

export type SessionStorageKey = EnumValues<typeof SESSION_STORAGE_KEY>;
