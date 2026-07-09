'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { authClient } from '@/libs/AuthClient';
import { SESSION_STORAGE_KEY } from '@/types/SessionStorage';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { getSessionStorage } from '@/utils/SessionStorage';

export const VerifyEmailFooter = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('VerifyEmailFooter');
  const email = getSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION);

  const handleResend = async () => {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'email-verification',
    });

    if (error) {
      toast.error(getAuthErrorMessage(tBetterAuthError, error));
      return;
    }

    toast.success(t('resend_success_toast'));
  };

  return (
    <>
      {t.rich('card_footer', {
        button: chunks => (
          <button
            type="button"
            onClick={handleResend}
            className="
              cursor-pointer text-muted-foreground underline underline-offset-4
            "
          >
            {chunks}
          </button>
        ),
      })}
    </>
  );
};
