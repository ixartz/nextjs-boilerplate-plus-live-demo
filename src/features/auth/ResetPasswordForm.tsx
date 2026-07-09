'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormRootError } from '@/components/FormRootError';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { authClient } from '@/libs/AuthClient';
import { useRouter } from '@/libs/I18nNavigation';
import { SESSION_STORAGE_KEY } from '@/types/SessionStorage';
import { AppConfig } from '@/utils/AppConfig';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { getSessionStorage, removeSessionStorage } from '@/utils/SessionStorage';
import { ResetPasswordValidation } from '@/validations/AuthValidation';

export const ResetPasswordForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('ResetPasswordForm');
  const router = useRouter();
  const email = getSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL);

  const form = useForm({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues: {
      otp: '',
      password: '',
    },
  });

  // Redirect to Sign In page if email is not found in session storage
  // `useEffect` runs only once when the component mounts, so no need to listen to `email` changes
  useEffect(() => {
    if (!email) {
      router.push('/sign-in');
    }
  }, []);

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.emailOtp.resetPassword({
      email,
      password: formData.password,
      otp: formData.otp.toUpperCase(),
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      // Clear password to encourage a clean retry
      form.resetField('password');
      return;
    }

    removeSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL);

    toast.success(t('success_toast'));

    // Auto sign-in after password reset
    const { error: autoSignInError } = await authClient.signIn.email({
      email,
      password: formData.password,
    });

    if (autoSignInError) {
      router.push('/sign-in');
      return;
    }

    router.push('/dashboard');
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

        {/* Help password managers to match the correct email */}
        <FormItem className="sr-only">
          <FormLabel>{t('email_label')}</FormLabel>
          <FormControl>
            <Input
              type="email"
              value={email}
              disabled
            />
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password_label')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('password_placeholder')}
                  type="password"
                  autoComplete="new-password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage errorMessage={t('password_error_message', { minLength: AppConfig.auth.minPasswordLength })} />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {t('submit_button')}
        </Button>
      </form>
    </Form>
  );
};
