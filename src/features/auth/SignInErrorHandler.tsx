'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { getAuthErrorMessage } from '@/utils/Helpers.client';

export const SignInErrorHandler = () => {
  const t = useTranslations('SignInErrorHandler');
  const searchParams = useSearchParams();

  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      toast.error(getAuthErrorMessage(t, { code: error.toUpperCase() }), {
        id: 'sign-in-auth-error',
        duration: 8 * 1000, // 8 seconds
      });
    }
  }, []);

  return null;
};
