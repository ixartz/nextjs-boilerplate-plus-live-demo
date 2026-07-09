import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import QRCode from 'react-qr-code';
import { FormRootError } from '@/components/FormRootError';
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { authClient } from '@/libs/AuthClient';
import { AppConfig } from '@/utils/AppConfig';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { VerifyTotpValidation } from '@/validations/SettingsValidation';

export const EnableMfaTotpForm = (props: {
  onSuccess: () => void;
  totpURI: string;
}) => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('EnableMfaTotpForm');
  // WORKAROUND: InputOTP and React Hook Form have a focus issue when there is a error, the user is not able to type again
  // It only happens when there is only one input field
  const buttonRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(VerifyTotpValidation),
    defaultValues: {
      totp: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.twoFactor.verifyTotp({
      code: formData.totp,
      trustDevice: false,
    });

    if (error) {
      form.setError('root', {
        message: getAuthErrorMessage(tBetterAuthError, error),
      });
      return;
    }

    props.onSuccess();
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('dialog_title')}</DialogTitle>
        <DialogDescription>{t('dialog_description', { totpLength: AppConfig.auth.TOTPLength })}</DialogDescription>
      </DialogHeader>

      <div className="flex items-center justify-center">
        <QRCode
          value={props.totpURI}
          className="size-48 rounded-lg bg-muted p-3"
        />
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} noValidate className="mt-3 space-y-6">
          <FormRootError />

          <FormField
            control={form.control}
            name="totp"
            render={({ field }) => (
              <FormItem className="justify-items-center">
                <FormLabel>{t('totp_label')}</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={AppConfig.auth.TOTPLength}
                    pattern={REGEXP_ONLY_DIGITS}
                    autoComplete="one-time-code"
                    disabled={form.formState.isSubmitting}
                    onComplete={() => buttonRef.current?.focus()}
                    {...field}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: AppConfig.auth.TOTPLength }, (_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage
                  errorMessage={t('totp_error_message', { totpLength: AppConfig.auth.TOTPLength })}
                />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full whitespace-pre-wrap"
            ref={buttonRef}
          >
            {t('submit_button')}
          </Button>
        </form>
      </Form>
    </>
  );
};
