'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { authClient } from '@/libs/AuthClient';
import { useRouter } from '@/libs/I18nNavigation';
import { mapLocaleToStripe } from '@/utils/Helpers';
import { getAuthErrorMessage } from '@/utils/Helpers.client';

export const ManageSubscriptionButton = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('ManageSubscriptionButton');
  const locale = useLocale();
  const router = useRouter();
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);

  const handleOpenBillingPortal = async () => {
    setIsOpeningPortal(true);

    const { data, error } = await authClient.subscription.billingPortal({
      locale: mapLocaleToStripe(locale),
      returnUrl: `/${locale}/dashboard/settings/billing`,
    });

    if (error) {
      toast.error(getAuthErrorMessage(tBetterAuthError, error));
      setIsOpeningPortal(false);
      return;
    }

    router.push(data.url);
    setIsOpeningPortal(false);
  };

  return (
    <Button size="sm" onClick={handleOpenBillingPortal} disabled={isOpeningPortal}>
      {t('manage_subscription_button')}
    </Button>
  );
};
