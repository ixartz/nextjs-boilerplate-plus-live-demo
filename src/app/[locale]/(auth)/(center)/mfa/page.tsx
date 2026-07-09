import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MfaTotpForm } from '@/features/auth/MfaTotpForm';
import { AccessCard } from '@/features/dashboard/AccessCard';
import { Link } from '@/libs/I18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

type MfaPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: MfaPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'MfaPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function MfaPage(props: MfaPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'MfaPage',
  });

  return (
    <AccessCard
      title={t('card_title')}
      description={t('card_description', { totpLength: AppConfig.auth.TOTPLength })}
      footer={t.rich('card_footer', {
        link: chunks => (
          <Link
            href="/mfa/backup-code"
            className="text-muted-foreground underline underline-offset-4"
          >
            {chunks}
          </Link>
        ),
      })}
    >
      <MfaTotpForm />
    </AccessCard>
  );
}
