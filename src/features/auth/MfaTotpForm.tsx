'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
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
import { MfaTotpValidation } from '@/validations/AuthValidation';

export const MfaTotpForm = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('MfaTotpForm');
  const router = useRouter();
  // WORKAROUND: InputOTP and React Hook Form have a focus issue when there is a error, the user is not able to type again
  // It only happens when there is only one input field
  const buttonRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(MfaTotpValidation),
    defaultValues: {
      totp: '',
    },
  });

  useEffect(() => {
    form.setFocus('totp');
  }, []);

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.twoFactor.verifyTotp({
      code: formData.totp,
      trustDevice: false,
    });

    if (error) {
      // Ask the user to sign in again if the TOTP cookie is invalid
      if (error.code === 'INVALID_TWO_FACTOR_COOKIE') {
        toast.error(tBetterAuthError('INVALID_TWO_FACTOR_COOKIE'));
        router.replace('/sign-in');
        return;
      }

      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      form.resetField('totp');
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
          name="totp"
          render={({ field }) => (
            <FormItem className="justify-items-center">
              <FormControl>
                <InputOTP
                  {...field}
                  maxLength={AppConfig.auth.TOTPLength}
                  pattern={REGEXP_ONLY_DIGITS}
                  autoComplete="one-time-code"
                  disabled={form.formState.isSubmitting}
                  onComplete={() => buttonRef.current?.focus()}
                >
                  <InputOTPGroup>
                    {Array.from({ length: AppConfig.auth.TOTPLength }, (_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage errorMessage={t('totp_error_message', { totpLength: AppConfig.auth.TOTPLength })} />
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
