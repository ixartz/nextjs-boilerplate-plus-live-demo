import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LabeledDivider } from '@/components/LabeledDivider';
import { AuthButtons } from '@/features/auth/AuthButtons';
import { SignUpForm } from '@/features/auth/SignUpForm';
import { AccessCard } from '@/features/dashboard/AccessCard';
import { Link } from '@/libs/I18nNavigation';

type SignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: SignUpPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignUpPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignUpPage(props: SignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'SignUpPage',
  });

  return (
    <AccessCard
      title={t('card_title')}
      description={t('card_description')}
      footer={t.rich('card_footer', {
        link: chunks => (
          <Link
            href="/sign-in"
            className="text-muted-foreground underline underline-offset-4"
          >
            {chunks}
          </Link>
        ),
      })}
    >
      <AuthButtons />

      <LabeledDivider label={t('or_continue_with')} />

      <SignUpForm />
    </AccessCard>
  );
}
