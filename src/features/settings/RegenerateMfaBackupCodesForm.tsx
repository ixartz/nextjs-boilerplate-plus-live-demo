'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormRootError } from '@/components/FormRootError';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/libs/AuthClient';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { RegenerateBackupCodesValidation } from '@/validations/SettingsValidation';
import { SaveBackupCodesForm } from './SaveBackupCodesForm';

export const RegenerateMfaBackupCodesForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('RegenerateMfaBackupCodesForm');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const form = useForm({
    resolver: zodResolver(RegenerateBackupCodesValidation),
    defaultValues: {
      currentPassword: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { data, error } = await authClient.twoFactor.generateBackupCodes({
      password: formData.currentPassword,
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      return;
    }

    form.reset();
    setBackupCodes(data.backupCodes);
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
                <FormMessage errorMessage={t('current_password_error_message')} />
              </FormItem>
            )}
          />

          <Button type="submit" variant="destructive" disabled={form.formState.isSubmitting}>
            {t('submit_button')}
          </Button>
        </form>
      </Form>

      <Dialog open={backupCodes.length > 0}>
        <DialogContent showCloseButton={false} onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()}>
          <SaveBackupCodesForm
            backupCodes={backupCodes}
            onClose={() => {
              setBackupCodes([]);

              toast.success(t('success_toast'));
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
