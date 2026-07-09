import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { LabeledDivider } from '@/components/LabeledDivider';
import { AuthButtons } from '@/features/auth/AuthButtons';
import { SignInErrorHandler } from '@/features/auth/SignInErrorHandler';
import { SignInForm } from '@/features/auth/SignInForm';
import { AccessCard } from '@/features/dashboard/AccessCard';
import { Link } from '@/libs/I18nNavigation';

type SignInPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: SignInPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignInPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignInPage(props: SignInPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'SignInPage',
  });

  return (
    <>
      <Suspense>
        <SignInErrorHandler />
      </Suspense>

      <AccessCard
        title={t('card_title')}
        description={t('card_description')}
        footer={t.rich('card_footer', {
          link: chunks => (
            <Link
              href="/sign-up"
              className="text-muted-foreground underline underline-offset-4"
            >
              {chunks}
            </Link>
          ),
        })}
      >
        <AuthButtons />

        <LabeledDivider label={t('or_continue_with')} />

        <SignInForm />
      </AccessCard>
    </>
  );
}
