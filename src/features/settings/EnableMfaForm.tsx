'use client';

import type { MfaSetupData } from '@/types/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormRootError } from '@/components/FormRootError';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/libs/AuthClient';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { EnableMfaValidation } from '@/validations/SettingsValidation';
import { EnableMfaDialog } from './EnableMfaDialog';

export const EnableMfaForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('EnableMfaForm');
  const [mfaSetupData, setMfaSetupData] = useState<MfaSetupData>({ totpURI: '', backupCodes: [] });

  const form = useForm({
    resolver: zodResolver(EnableMfaValidation),
    defaultValues: {
      currentPassword: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { data, error } = await authClient.twoFactor.enable({
      password: formData.currentPassword,
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      return;
    }

    form.reset();
    setMfaSetupData(data);
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <FormRootError />

          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('current_password_label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t('current_password_placeholder')}
                    autoComplete="current-password"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormDescription>{t('current_password_description')}</FormDescription>
                <FormMessage errorMessage={t('current_password_error_message')} />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {t('submit_button')}
            <ArrowRight />
          </Button>
        </form>
      </Form>

      <EnableMfaDialog
        onClose={() => setMfaSetupData({ totpURI: '', backupCodes: [] })}
        mfaSetupData={mfaSetupData}
      />
    </>
  );
};
