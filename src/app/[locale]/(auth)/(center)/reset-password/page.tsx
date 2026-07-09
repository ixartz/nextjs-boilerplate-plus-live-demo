import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ResetPasswordDescription } from '@/features/auth/ResetPasswordDescription';
import { ResetPasswordForm } from '@/features/auth/ResetPasswordForm';
import { AccessCard } from '@/features/dashboard/AccessCard';
import { Link } from '@/libs/I18nNavigation';

type ResetPasswordPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ResetPasswordPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'ResetPasswordPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function ResetPasswordPage(props: ResetPasswordPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'ResetPasswordPage',
  });

  return (
    <AccessCard
      title={t('card_title')}
      description={<ResetPasswordDescription />}
      footer={t.rich('card_footer', {
        link: chunks => (
          <Link
            href="/forgot-password"
            className="text-muted-foreground underline underline-offset-4"
          >
            {chunks}
          </Link>
        ),
      })}
    >
      <ResetPasswordForm />
    </AccessCard>
  );
}
