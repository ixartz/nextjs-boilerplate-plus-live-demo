'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FormRootError } from '@/components/FormRootError';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/libs/AuthClient';
import { useRouter } from '@/libs/I18nNavigation';
import { SESSION_STORAGE_KEY } from '@/types/SessionStorage';
import { AppConfig } from '@/utils/AppConfig';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { setSessionStorage } from '@/utils/SessionStorage';
import { SignUpValidation } from '@/validations/AuthValidation';

export const SignUpForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('SignUpForm');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.signUp.email(formData);

    if (error) {
      // WORKAROUND: better-auth-harmony returns a generic "Invalid email" error for disposable emails
      if (error.message === 'Invalid email') {
        form.setError('root', {
          message: tBetterAuthError('DISPOSABLE_EMAIL'),
        });
      } else {
        form.setError('root', {
          message: getAuthErrorMessage(tBetterAuthError, error),
        });
      }

      // Clear password to encourage a clean retry
      form.resetField('password');
      return;
    }

    setSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION, formData.email);

    router.push('/verify-email');
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <FormRootError />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name_label')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('name_placeholder')}
                  autoComplete="name"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage errorMessage={t('name_error_message')} />
            </FormItem>
          )}
        />

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
