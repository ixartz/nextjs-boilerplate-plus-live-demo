import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MfaBackupForm } from '@/features/auth/MfaBackupForm';
import { AccessCard } from '@/features/dashboard/AccessCard';
import { Link } from '@/libs/I18nNavigation';

type MfaBackupPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: MfaBackupPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'MfaBackupPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function MfaBackupPage(props: MfaBackupPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'MfaBackupPage',
  });

  return (
    <AccessCard
      title={t('card_title')}
      description={t('card_description')}
      footer={t.rich('card_footer', {
        link: chunks => (
          <Link
            href="/mfa"
            className="text-muted-foreground underline underline-offset-4"
          >
            {chunks}
          </Link>
        ),
      })}
    >
      <MfaBackupForm />
    </AccessCard>
  );
}
