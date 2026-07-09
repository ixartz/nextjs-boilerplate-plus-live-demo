import alchemy from 'alchemy';
import { Price, Product } from 'alchemy/stripe';
import { createTranslator } from 'next-intl';
import { AppConfig } from '@/utils/AppConfig';
import { PaidPlans } from '@/utils/PricingPlans';

await alchemy(AppConfig.name);

const messages = (await import(`../src/locales/en.json`)).default;

const t = createTranslator({
  locale: 'en',
  messages,
  namespace: 'PricingPlans',
});

for (const plan of PaidPlans) {
  const product = await Product(`${plan.name} Stripe subscription`, {
    name: t(`${plan.name}_plan_name`),
  });

  await Price(`${plan.name} ${plan.price} ${plan.lookupKey} monthly price`, {
    product: product.id,
    currency: 'usd',
    unitAmount: plan.price * 100,
    recurring: {
      interval: 'month',
    },
    lookupKey: plan.lookupKey,
    transferLookupKey: true,
  });
}
