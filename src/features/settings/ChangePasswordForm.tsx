'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormRootError } from '@/components/FormRootError';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/libs/AuthClient';
import { useRouter } from '@/libs/I18nNavigation';
import { AppConfig } from '@/utils/AppConfig';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { ChangePasswordValidation } from '@/validations/SettingsValidation';

export const ChangePasswordForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('ChangePasswordForm');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ChangePasswordValidation),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      revokeOtherSessions: true,
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      form.resetField('currentPassword');
      form.resetField('newPassword');
      form.resetField('confirmPassword');
      return;
    }

    toast.success(t('success_toast'));
    router.push('/dashboard/settings'); // WORKAROUND: make password managers recognize the password change
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <FormRootError />

        {/*
          * There is no need to include the email field for password managers,
          * as the heuristic works better without it
          */}

        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('current_password_label')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('current_password_placeholder')}
                  type="password"
                  autoComplete="current-password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage errorMessage={t('current_password_error_message')} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('new_password_label')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('new_password_placeholder')}
                  type="password"
                  autoComplete="new-password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage errorMessage={t('new_password_error_message', { minLength: AppConfig.auth.minPasswordLength })} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirm_password_label')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('confirm_password_placeholder')}
                  type="password"
                  autoComplete="new-password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage errorMessage={t('confirm_password_error_message')} />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {t('submit_button')}
        </Button>
      </form>
    </Form>
  );
};
