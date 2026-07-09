import type { Subscription } from '@/types/Auth';
import { useFormatter, useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { ManageSubscriptionButton } from '@/features/billing/ManageSubscriptionButton';
import { getCurrentPlanFromSubscription } from '@/services/BillingService';
import { PricingFeatureList } from './PricingFeatureList';

export const CurrentPlanDetails = (props: {
  subscription?: Subscription;
}) => {
  const tPlans = useTranslations('PricingPlans');
  const t = useTranslations('CurrentPlanDetails');
  const format = useFormatter();

  const currentPlan = getCurrentPlanFromSubscription(props.subscription);
  const eventDate = props.subscription?.cancelAtPeriodEnd
    ? props.subscription.cancelAt
    : props.subscription?.periodEnd;

  return (
    <Card>
      <CardContent>
        <div className="
          flex items-start justify-between gap-2
          @max-md:flex-col
        "
        >
          <div>
            <div className="
              bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
              bg-clip-text text-2xl font-bold text-transparent
            "
            >
              {tPlans(`${currentPlan.name}_plan_name`)}
            </div>

            {props.subscription && eventDate && (
              <div className="text-xs font-medium text-muted-foreground">
                {props.subscription.cancelAtPeriodEnd
                  ? t('cancels_on', {
                      date: format.dateTime(eventDate, {
                        dateStyle: 'full',
                      }),
                    })
                  : t('renews_on', {
                      date: format.dateTime(eventDate, {
                        dateStyle: 'full',
                      }),
                    })}
              </div>
            )}
          </div>

          {props.subscription && <ManageSubscriptionButton />}
        </div>

        <div className="mt-3 text-sm font-medium text-foreground/90">
          {t('plan_includes')}
        </div>

        <ul className="mt-2 space-y-2">
          <PricingFeatureList limits={currentPlan.limits} />
        </ul>
      </CardContent>
    </Card>
  );
};
