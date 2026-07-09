'use client';

import type * as z from 'zod';
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
import { NameValidation } from '@/validations/SettingsValidation';

export const ProfileNameForm = (props: {
  defaultValues: z.infer<typeof NameValidation>;
}) => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('ProfileNameForm');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(NameValidation),
    defaultValues: props.defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.updateUser({
      name: formData.name,
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      return;
    }

    toast.success(t('success_toast'));
    router.refresh();
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
                <Input {...field} disabled={form.formState.isSubmitting} />
              </FormControl>
              <FormMessage errorMessage={t('name_error_message')} />
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
