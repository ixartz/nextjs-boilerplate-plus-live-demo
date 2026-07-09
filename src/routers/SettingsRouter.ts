import { ORPCError } from '@orpc/client';
import { APIError } from 'better-auth';
import { headers } from 'next/headers';
import * as z from 'zod';
import { auth } from '@/libs/Auth';
import { API_ERROR } from '@/types/ApiError';
import { hasPasswordAuth, isFreshSession } from '@/utils/Auth';
import { ChangeEmailValidation } from '@/validations/SettingsValidation';
import { authProcedure } from './Procedure';

export const requestEmailChange = authProcedure(true)
  .input(ChangeEmailValidation)
  .errors({
    [API_ERROR.FRESH_AUTH_REQUIRED]: {},
    [API_ERROR.UNKNOWN_ERROR]: {},
    [API_ERROR.BETTER_AUTH_ERROR]: {
      data: z.object({
        errorCode: z.string().optional(),
      }),
    },
  })
  .handler(async ({ context, input, errors }) => {
    const requestHeaders = await headers();

    try {
      const hasPasswordAccount = await hasPasswordAuth();

      if (hasPasswordAccount) {
        await auth.api.verifyPassword({
          headers: requestHeaders,
          body: {
            password: input.currentPassword ?? '',
          },
        });
      } else if (!isFreshSession(context.auth.session)) {
        /**
         * Users without a password prove their identity with fresh provider
         * authentication instead. Sessions for these users can only be
         * created through an OAuth sign-in (no password, and sign-in OTPs are
         * not enabled), so a freshly created session is proof of fresh
         * provider authentication.
         */
        throw errors.FRESH_AUTH_REQUIRED();
      }

      /**
       * Better Auth normally requires OTP proof for both the current and new
       * email addresses when `verifyCurrentEmail` is enabled.
       *
       * This route uses the current password as the current-email proof, then
       * creates the current-email OTP server-side and passes it to
       * `requestEmailChangeEmailOTP`, so only the new-email OTP is sent.
       *
       * The email OTP plugin doesn't send current-email OTPs, so direct
       * client API calls cannot obtain the OTP required to bypass this
       * password verification.
       */
      const currentEmailOtp = await auth.api.createVerificationOTP({
        headers: requestHeaders,
        body: {
          email: context.auth.session.user.email,
          type: 'email-verification',
        },
      });
      await auth.api.requestEmailChangeEmailOTP({
        headers: requestHeaders,
        body: {
          newEmail: input.newEmail,
          otp: currentEmailOtp,
        },
      });
    } catch (error) {
      if (error instanceof APIError) {
        // WORKAROUND: Better Auth doesn't have a specific error code for "Email is the same"
        if (error.message === 'Email is the same') {
          throw errors.BETTER_AUTH_ERROR({ data: { errorCode: 'EMAIL_IS_THE_SAME' } });
        }

        throw errors.BETTER_AUTH_ERROR({ data: { errorCode: error.body?.code } });
      } else if (error instanceof ORPCError) {
        throw error;
      } else {
        throw errors.UNKNOWN_ERROR();
      }
    }
  });
