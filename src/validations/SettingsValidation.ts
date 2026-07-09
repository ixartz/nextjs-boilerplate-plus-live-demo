import * as z from 'zod';
import { AppConfig } from '@/utils/AppConfig';

export const NameValidation = z.object({
  name: z.string().min(1),
});

export const ChangePasswordValidation = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(AppConfig.auth.minPasswordLength),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  path: ['confirmPassword'],
});

export const ChangeEmailValidation = z.object({
  newEmail: z.email(),
  /**
   * Password accounts require a current password. OAuth-only accounts must
   * complete a fresh provider authentication.
   */
  currentPassword: z.string().min(1).optional(),
});

export const VerifyNewEmailValidation = z.object({
  otp: z.string().length(AppConfig.auth.OTPLength),
});

export const EnableMfaValidation = z.object({
  currentPassword: z.string().min(1),
});

export const DisableMfaValidation = z.object({
  currentPassword: z.string().min(1),
});

export const RegenerateBackupCodesValidation = z.object({
  currentPassword: z.string().min(1),
});

export const VerifyTotpValidation = z.object({
  totp: z.string().length(AppConfig.auth.TOTPLength),
});

export const SaveBackupCodesValidation = z.object({
  saved: z.boolean().refine(Boolean),
});
