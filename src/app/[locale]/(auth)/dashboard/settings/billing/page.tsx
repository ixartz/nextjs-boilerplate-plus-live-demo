import { getTranslations, setRequestLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { CurrentPlanDetails } from '@/features/billing/CurrentPlanDetails';
import { UpgradeOptions } from '@/features/billing/UpgradeOptions';
import { DashboardSection } from '@/features/dashboard/DashboardSection';
import { auth } from '@/libs/Auth';
import { isActiveOrTrialing } from '@/services/BillingService';
import { requireAuth } from '@/utils/Auth';

export default async function BillingPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'BillingPage',
  });

  await requireAuth();

  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: await headers(),
  });

  const activeSubscription = subscriptions.find(isActiveOrTrialing);

  return (
    <>
      <DashboardSection
        title={t('current_section_title')}
        description={t('current_section_description')}
      >
        <CurrentPlanDetails subscription={activeSubscription} />
      </DashboardSection>

      {!activeSubscription && (
        <DashboardSection
          className="mt-8"
          title={t('upgrade_section_title')}
          description={t('upgrade_section_description')}
        >
          <UpgradeOptions />
        </DashboardSection>
      )}
    </>
  );
}
