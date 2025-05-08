export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'elite';

export interface SubscriptionFeature {
  title: string;
  description: string;
  tiers: SubscriptionTier[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const SUBSCRIPTION_FEATURES: SubscriptionFeature[] = [
  {
    title: 'Friends',
    description: 'Free: 3 friends, Basic and above: Unlimited',
    tiers: ['basic', 'pro', 'elite']
  },
  {
    title: 'Groups',
    description: 'Free: 1 group, Basic and above: Unlimited',
    tiers: ['basic', 'pro', 'elite']
  },
  {
    title: 'Analytics',
    description: 'Free: Basic stats, Basic and above: Full analytics',
    tiers: ['basic', 'pro', 'elite']
  },
  {
    title: 'Ad-free',
    description: 'No advertisements during sessions',
    tiers: ['basic', 'pro', 'elite']
  },
  {
    title: 'Custom Challenges',
    description: 'Basic: 1/month, Pro and Elite: Unlimited',
    tiers: ['basic', 'pro', 'elite']
  },
  {
    title: 'Priority Detection',
    description: 'Faster pushup detection processing',
    tiers: ['pro', 'elite']
  },
  {
    title: 'Data Export',
    description: 'Export your pushup data as CSV or PDF',
    tiers: ['pro', 'elite']
  },
  {
    title: 'Early Access',
    description: 'Try new features before everyone else',
    tiers: ['elite']
  },
  {
    title: 'Private Communities',
    description: 'Host private community boards',
    tiers: ['elite']
  },
  {
    title: '24/7 Support',
    description: 'Get dedicated customer support',
    tiers: ['elite']
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free-tier',
    name: 'Free Trial',
    tier: 'free',
    priceMonthly: 0,
    priceYearly: 0,
    description: 'Try Gimmi10 free for 14 days',
    features: [
      '3 friends limit',
      '1 group limit',
      'Basic analytics (daily/weekly)',
      'Ads during sessions'
    ]
  },
  {
    id: 'basic-tier',
    name: 'Basic',
    tier: 'basic',
    priceMonthly: 4.99,
    priceYearly: 49.99,
    description: 'Perfect for casual fitness enthusiasts',
    features: [
      'Unlimited friends',
      'Unlimited groups',
      'Full analytics',
      'Ad-free experience',
      '1 custom challenge per month'
    ]
  },
  {
    id: 'pro-tier',
    name: 'Pro',
    tier: 'pro',
    priceMonthly: 9.99,
    priceYearly: 99.99,
    description: 'Unlock more features for serious users',
    isPopular: true,
    features: [
      'All Basic features',
      'Priority pushup detection',
      'Unlimited custom challenges',
      'Exclusive badges and customization',
      'Data export functionality'
    ]
  },
  {
    id: 'elite-tier',
    name: 'Elite',
    tier: 'elite',
    priceMonthly: 19.99,
    priceYearly: 199.99,
    description: 'The ultimate Gimmi10 experience',
    features: [
      'All Pro features',
      'Early access to new features',
      'Dedicated 24/7 customer support',
      'Host private community boards',
      'Premium analytics insights'
    ]
  }
];