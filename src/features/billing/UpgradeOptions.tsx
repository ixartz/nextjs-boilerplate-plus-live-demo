'use client';

import type { PlanName } from '@/types/Subscription';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { authClient } from '@/libs/AuthClient';
import { mapLocaleToStripe } from '@/utils/Helpers';
import { getAuthErrorMessage } from '@/utils/Helpers.client';
import { PaidPlans } from '@/utils/PricingPlans';
import { PricingCard } from './PricingCard';

export const UpgradeOptions = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('UpgradeOptions');
  const locale = useLocale();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = async (plan: PlanName) => {
    setIsUpgrading(true);

    const { error } = await authClient.subscription.upgrade({
      plan,
      successUrl: `/${locale}/dashboard/settings/billing/checkout-success`,
      cancelUrl: `/${locale}/dashboard/settings/billing`,
      locale: mapLocaleToStripe(locale),
    });

    if (error) {
      toast.error(getAuthErrorMessage(tBetterAuthError, error));
    }

    setIsUpgrading(false);
  };

  return (
    <div className="
      grid grid-cols-1 gap-x-6 gap-y-8
      @4xl:grid-cols-2
    "
    >
      {PaidPlans.map(plan => (
        <PricingCard
          key={plan.name}
          plan={plan}
          button={(
            <Button
              size="sm"
              className="w-full"
              disabled={isUpgrading}
              onClick={() => handleUpgrade(plan.name)}
            >
              {t('upgrade_button_label')}
            </Button>
          )}
        />
      ))}
    </div>
  );
};
