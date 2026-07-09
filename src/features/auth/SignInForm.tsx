'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FormRootError } from '@/components/FormRootError';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/libs/AuthClient';
import { Link, useRouter } from '@/libs/I18nNavigation';
import { SESSION_STORAGE_KEY } from '@/types/SessionStorage';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { setSessionStorage } from '@/utils/SessionStorage';
import { SignInValidation } from '@/validations/AuthValidation';

export const SignInForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('SignInForm');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const redirectToEmailVerification = async (email: string) => {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'email-verification',
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      return;
    }

    setSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION, email);

    router.push('/verify-email');
  };

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { data, error } = await authClient.signIn.email(formData);

    if (error) {
      if (error.code === 'EMAIL_NOT_VERIFIED') {
        await redirectToEmailVerification(formData.email);
        return;
      }

      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      // Clear only the password to encourage a fresh retry
      form.resetField('password');
      return;
    }

    if (data.user) {
      router.push('/auth-redirect');
    } else {
      router.push(`/mfa`);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <FormRootError />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email_label')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('email_placeholder')}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage errorMessage={t('email_error_message')} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>{t('password_label')}</FormLabel>
                <Link
                  href="/forgot-password"
                  className="
                    text-xs underline-offset-4
                    hover:underline
                  "
                >
                  {t('forgot_password')}
                </Link>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('password_placeholder')}
                  type="password"
                  autoComplete="current-password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage errorMessage={t('password_error_message')} />
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
