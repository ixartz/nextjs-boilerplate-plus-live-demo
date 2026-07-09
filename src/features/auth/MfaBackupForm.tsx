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
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { MfaBackupValidation } from '@/validations/AuthValidation';

export const MfaBackupForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('MfaBackupForm');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(MfaBackupValidation),
    defaultValues: {
      code: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.twoFactor.verifyBackupCode({
      code: formData.code,
      trustDevice: false,
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      return;
    }

    router.push('/auth-redirect');
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <FormRootError />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('code_label')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('code_placeholder')}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage errorMessage={t('code_error_message')} />
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
