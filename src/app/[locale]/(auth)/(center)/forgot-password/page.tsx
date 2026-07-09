import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ForgotPasswordForm } from '@/features/auth/ForgotPasswordForm';
import { AccessCard } from '@/features/dashboard/AccessCard';
import { Link } from '@/libs/I18nNavigation';

type ForgotPasswordPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ForgotPasswordPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'ForgotPasswordPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function ForgotPasswordPage(props: ForgotPasswordPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'ForgotPasswordPage',
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
      <ForgotPasswordForm />
    </AccessCard>
  );
}
