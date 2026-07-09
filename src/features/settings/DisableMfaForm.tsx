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
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { DisableMfaValidation } from '@/validations/SettingsValidation';

export const DisableMfaForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('DisableMfaForm');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(DisableMfaValidation),
    defaultValues: {
      currentPassword: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.twoFactor.disable({
      password: formData.currentPassword,
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      return;
    }

    form.reset();
    toast.success(t('success_toast'));
    router.refresh();
  });

  return (
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
  );
};
