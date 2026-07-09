'use client';

import { useTranslations } from 'next-intl';
import { useSessionStorage } from '@/hooks/UseSessionStorage';
import { SESSION_STORAGE_KEY } from '@/types/SessionStorage';
import { AppConfig } from '@/utils/AppConfig';

export const VerifyEmailDescription = () => {
  const t = useTranslations('VerifyEmailPage');
  const email = useSessionStorage(SESSION_STORAGE_KEY.EMAIL_VERIFICATION);

  return (
    <div className="whitespace-pre-wrap">
      {t.rich('card_description', {
        otpLength: AppConfig.auth.OTPLength,
        email: () => <span className="font-bold break-all">{email}</span>,
      })}
    </div>
  );
};
