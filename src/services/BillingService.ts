import type { Subscription } from '@/types/Auth';
import { SUBSCRIPTION_STATUS } from '@/types/Subscription';
import { FreePlan, PaidPlans } from '@/utils/PricingPlans';

/**
 * Checks whether a subscription can be treated as currently available.
 * @param subscription The subscription status to check.
 * @returns Whether the subscription is active or trialing.
 */
export const isActiveOrTrialing = (subscription: Pick<Subscription, 'status'>) =>
  subscription.status === SUBSCRIPTION_STATUS.ACTIVE || subscription.status === SUBSCRIPTION_STATUS.TRIALING;

/**
 * Derives the plan from the subscription.
 * Falls back to the free plan when no matching subscription exists.
 * @param subscription The subscription object containing the plan name.
 * @returns The matching paid plan or the free plan.
 */
export const getCurrentPlanFromSubscription = (
  subscription?: Pick<Subscription, 'plan'>,
) => {
  if (!subscription) {
    return FreePlan;
  }

  const matchedPlan = PaidPlans.find(plan => plan.name === subscription.plan);

  if (matchedPlan) {
    return matchedPlan;
  }

  return FreePlan;
};
