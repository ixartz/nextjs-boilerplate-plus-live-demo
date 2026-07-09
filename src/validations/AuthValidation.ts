import * as z from 'zod';
import { AppConfig } from '@/utils/AppConfig';

export const SignInValidation = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const SignUpValidation = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(AppConfig.auth.minPasswordLength),
});

export const ForgotPasswordValidation = z.object({
  email: z.email(),
});

export const VerifyEmailValidation = z.object({
  otp: z.string().length(AppConfig.auth.OTPLength),
});

export const MfaTotpValidation = z.object({
  totp: z.string().length(AppConfig.auth.TOTPLength),
});

export const MfaBackupValidation = z.object({
  code: z.string().min(1),
});

export const ResetPasswordValidation = z.object({
  otp: z.string().length(AppConfig.auth.OTPLength),
  password: z.string().min(AppConfig.auth.minPasswordLength),
});
