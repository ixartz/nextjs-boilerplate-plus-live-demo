import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { VerifyEmailDescription } from '@/features/auth/VerifyEmailDescription';
import { VerifyEmailFooter } from '@/features/auth/VerifyEmailFooter';
import { VerifyEmailForm } from '@/features/auth/VerifyEmailForm';
import { AccessCard } from '@/features/dashboard/AccessCard';

type VerifyEmailPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: VerifyEmailPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'VerifyEmailPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function VerifyEmailPage(props: VerifyEmailPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'VerifyEmailPage',
  });

  return (
    <AccessCard
      title={t('card_title')}
      description={<VerifyEmailDescription />}
      footer={<VerifyEmailFooter />}
    >
      <VerifyEmailForm />
    </AccessCard>
  );
}
