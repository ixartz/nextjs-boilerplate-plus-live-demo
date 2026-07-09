'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isDefinedError, safe } from '@orpc/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormRootError } from '@/components/FormRootError';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { client } from '@/libs/Orpc';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { ChangeEmailValidation } from '@/validations/SettingsValidation';
import { VerifyNewEmailDialog } from './VerifyNewEmailDialog';

export const ChangeEmailForm = (props: {
  currentEmail: string;
  passwordRequired: boolean;
}) => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('ChangeEmailForm');
  const [pendingEmail, setPendingEmail] = useState('');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ChangeEmailValidation),
    defaultValues: {
      newEmail: '',
      currentPassword: props.passwordRequired ? '' : undefined,
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const [error] = await safe(client.settings.requestEmailChange(formData));

    if (isDefinedError(error)) {
      if (error.code === 'FRESH_AUTH_REQUIRED') {
        toast.error(t('fresh_auth_required_toast'));
        router.refresh();
        return;
      }

      if (error.code === 'BETTER_AUTH_ERROR') {
        form.setError('root', {
          message: getAuthErrorMessage(tBetterAuthError, { code: error.data.errorCode }),
        });
      }
      if (props.passwordRequired) {
        // Clear password to encourage a clean retry
        form.resetField('currentPassword');
      }
      return;
    }

    form.reset();
    setPendingEmail(formData.newEmail);
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <FormRootError />

          <FormItem>
            <FormLabel>{t('current_email_label')}</FormLabel>
            <FormControl>
              <Input value={props.currentEmail} disabled />
            </FormControl>
          </FormItem>

          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('new_email_label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('new_email_placeholder')}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage errorMessage={t('new_email_error_message')} />
              </FormItem>
            )}
          />

          {props.passwordRequired && (
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
          )}

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {t('submit_button')}
          </Button>
        </form>
      </Form>

      <VerifyNewEmailDialog
        newEmail={pendingEmail}
        onClose={() => setPendingEmail('')}
      />
    </>
  );
};
