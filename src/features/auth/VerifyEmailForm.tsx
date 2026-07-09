'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FormRootError } from '@/components/FormRootError';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { authClient } from '@/libs/AuthClient';
import { useRouter } from '@/libs/I18nNavigation';
import { SESSION_STORAGE_KEY } from '@/types/SessionStorage';
import { AppConfig } from '@/utils/AppConfig';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { getSessionStorage, removeSessionStorage } from '@/utils/SessionStorage';
import { VerifyEmailValidation } from '@/validations/AuthValidation';

export const VerifyEmailForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('VerifyEmailForm');
  const router = useRouter();
  const email = getSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION);
  // WORKAROUND: InputOTP and React Hook Form have a focus issue when there is a error, the user is not able to type again
  // It only happens when there is only one input field
  const buttonRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(VerifyEmailValidation),
    defaultValues: {
      otp: '',
    },
  });

  // Redirect to Sign In page if email is not found in session storage
  // `useEffect` runs only once when the component mounts, so no need to listen to `email` changes
  useEffect(() => {
    if (!email) {
      router.push('/sign-in');
      return;
    }

    form.setFocus('otp');
  }, []);

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.emailOtp.verifyEmail({
      otp: formData.otp.toUpperCase(),
      email,
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      return;
    }

    removeSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION);

    router.push('/auth-redirect?fallback=/dashboard');
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <FormRootError />

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="justify-items-center">
              <FormControl>
                <InputOTP
                  {...field}
                  maxLength={AppConfig.auth.OTPLength}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  autoComplete="one-time-code"
                  spellCheck={false}
                  disabled={form.formState.isSubmitting}
                  onComplete={() => buttonRef.current?.focus()}
                  aria-label={t('otp_input_aria_label')}
                >
                  <InputOTPGroup>
                    {Array.from({ length: AppConfig.auth.OTPLength }, (_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage errorMessage={t('otp_error_message', { otpLength: AppConfig.auth.OTPLength })} />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
          ref={buttonRef}
        >
          {t('submit_button')}
        </Button>
      </form>
    </Form>
  );
};
