import { Shield } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DashboardSection } from '@/features/dashboard/DashboardSection';
import { ChangePasswordForm } from '@/features/settings/ChangePasswordForm';

export default async function PasswordSettingsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'PasswordSettingsPage',
  });

  return (
    <DashboardSection
      title={t('section_title')}
      description={t('section_description')}
    >
      <Alert className="mb-8">
        <Shield />
        <AlertTitle>{t('security_tip_title')}</AlertTitle>
        <AlertDescription>
          {t('security_tip_description')}
        </AlertDescription>
      </Alert>

      <ChangePasswordForm />
    </DashboardSection>
  );
}
