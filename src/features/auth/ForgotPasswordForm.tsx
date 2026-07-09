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
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { setSessionStorage } from '@/utils/SessionStorage';
import { ForgotPasswordValidation } from '@/validations/AuthValidation';

export const ForgotPasswordForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('ForgotPasswordForm');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.forgetPassword.emailOtp(formData);

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      return;
    }

    setSessionStorage(SESSION_STORAGE_KEY.PASSWORD_RESET_EMAIL, formData.email);

    router.push('/reset-password');
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
