'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormRootError } from '@/components/FormRootError';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { authClient } from '@/libs/AuthClient';
import { useRouter } from '@/libs/I18nNavigation';
import { AppConfig } from '@/utils/AppConfig';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { VerifyNewEmailValidation } from '@/validations/SettingsValidation';

export const VerifyNewEmailForm = (props: {
  newEmail: string;
}) => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('VerifyNewEmailForm');
  const router = useRouter();
  // WORKAROUND: InputOTP and React Hook Form have a focus issue when there is a error, the user is not able to type again
  // It only happens when there is only one input field
  const buttonRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(VerifyNewEmailValidation),
    defaultValues: {
      otp: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.emailOtp.changeEmail({
      newEmail: props.newEmail,
      otp: formData.otp.toUpperCase(),
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      return;
    }

    toast.success(t('success_toast'));
    router.push('/dashboard/settings');
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <FormRootError />

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="justify-items-center">
              <FormControl>
                <InputOTP
                  {...field}
                  maxLength={AppConfig.auth.OTPLength}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  autoComplete="one-time-code"
                  spellCheck={false}
                  disabled={form.formState.isSubmitting}
                  onComplete={() => buttonRef.current?.focus()}
                  aria-label={t('otp_input_aria_label')}
                >
                  <InputOTPGroup>
                    {Array.from({ length: AppConfig.auth.OTPLength }, (_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage errorMessage={t('otp_error_message', { otpLength: AppConfig.auth.OTPLength })} />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
          ref={buttonRef}
        >
          {t('submit_button')}
        </Button>
      </form>
    </Form>
  );
};
