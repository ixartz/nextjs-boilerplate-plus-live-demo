import Stripe from 'stripe';

import { Env } from './Env';

export const stripeClient = new Stripe(Env.STRIPE_API_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  typescript: true,
});
