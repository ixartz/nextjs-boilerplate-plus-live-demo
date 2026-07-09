import type { StripePlan } from '@better-auth/stripe';
import type { EnumValues } from './Enum';
import type { PLAN_NAME } from '@/utils/PricingPlans';

export type PlanName = EnumValues<typeof PLAN_NAME>;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  TRIALING: 'trialing',
} as const;

export type PricingPlan = StripePlan & {
  name: PlanName;
  price: number;
  lookupKey: string;
  limits: {
    website: number;
    storage: number;
    transfer: number;
  };
};
