import { describe, expect, it } from 'vitest';
import { SUBSCRIPTION_STATUS } from '@/types/Subscription';
import { FreePlan, PLAN_NAME } from '@/utils/PricingPlans';
import { getCurrentPlanFromSubscription, isActiveOrTrialing } from './BillingService';

describe('BillingService', () => {
  describe('isActiveOrTrialing', () => {
    it('returns true when subscription is active', () => {
      const result = isActiveOrTrialing({ status: SUBSCRIPTION_STATUS.ACTIVE });

      expect(result).toBe(true);
    });

    it('returns true when subscription is trialing', () => {
      const result = isActiveOrTrialing({ status: SUBSCRIPTION_STATUS.TRIALING });

      expect(result).toBe(true);
    });

    it('returns false when subscription is canceled', () => {
      const result = isActiveOrTrialing({ status: SUBSCRIPTION_STATUS.PAUSED });

      expect(result).toBe(false);
    });
  });

  describe('getCurrentPlanFromSubscriptionn', () => {
    it('returns free plan when subscription is undefined', () => {
      const result = getCurrentPlanFromSubscription(undefined);

      expect(result).toBe(FreePlan);
    });

    it('returns free plan when subscription plan is an empty string', () => {
      const result = getCurrentPlanFromSubscription({ plan: '' });

      expect(result).toBe(FreePlan);
    });

    it('returns free plan when subscription plan does not match any paid plan', () => {
      const result = getCurrentPlanFromSubscription({ plan: 'unknown_plan' });

      expect(result).toBe(FreePlan);
    });

    it('returns free plan when subscription plan matches free plan name', () => {
      const result = getCurrentPlanFromSubscription({ plan: PLAN_NAME.FREE });

      expect(result).toBe(FreePlan);
    });

    it('returns premium plan when subscription matches premium', () => {
      const result = getCurrentPlanFromSubscription({
        plan: PLAN_NAME.PREMIUM,
      });

      expect(result.name).toBe(PLAN_NAME.PREMIUM);
      expect(result.lookupKey).toBe('premium_monthly');
    });

    it('returns enterprise plan when subscription matches enterprise', () => {
      const result = getCurrentPlanFromSubscription({
        plan: PLAN_NAME.ENTERPRISE,
      });

      expect(result.name).toBe(PLAN_NAME.ENTERPRISE);
      expect(result.lookupKey).toBe('enterprise_monthly');
    });
  });
});
