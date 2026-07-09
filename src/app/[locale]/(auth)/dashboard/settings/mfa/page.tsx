import { AlertTriangle, Smartphone } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { DashboardSection } from '@/features/dashboard/DashboardSection';
import { DisableMfaForm } from '@/features/settings/DisableMfaForm';
import { EnableMfaForm } from '@/features/settings/EnableMfaForm';
import { RegenerateMfaBackupCodesForm } from '@/features/settings/RegenerateMfaBackupCodesForm';
import { requireAuth } from '@/utils/Auth';

export default async function MfaSettingsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'MfaSettingsPage',
  });

  const session = await requireAuth();

  if (session.user.twoFactorEnabled) {
    return (
      <>
        <DashboardSection
          title={t('disable_section_title')}
          description={t('disable_section_description')}
        >
          <Alert className="mb-6">
            <AlertTriangle />
            <AlertDescription>{t('disable_alert_description')}</AlertDescription>
          </Alert>

          <DisableMfaForm />
        </DashboardSection>

        <Separator className="my-8 max-w-2xl" />

        <DashboardSection
          title={t('regenerate_section_title')}
          description={t('regenerate_section_description')}
        >
          <Alert className="mb-6">
            <AlertTriangle />
            <AlertDescription>{t('regenerate_alert_description')}</AlertDescription>
          </Alert>

          <RegenerateMfaBackupCodesForm />
        </DashboardSection>
      </>
    );
  }

  return (
    <DashboardSection
      title={t('enable_section_title')}
      description={t('enable_section_description')}
    >
      <Alert className="mb-8">
        <Smartphone />
        <AlertTitle>{t('enable_info_title')}</AlertTitle>
        <AlertDescription>{t('enable_info_description')}</AlertDescription>
      </Alert>

      <EnableMfaForm />
    </DashboardSection>
  );
}
