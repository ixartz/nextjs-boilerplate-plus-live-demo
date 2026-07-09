import { Mail } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignInErrorHandler } from '@/features/auth/SignInErrorHandler';
import { DashboardSection } from '@/features/dashboard/DashboardSection';
import { ChangeEmailForm } from '@/features/settings/ChangeEmailForm';
import { ChangeEmailFreshAuthButton } from '@/features/settings/ChangeEmailFreshAuthButtons';
import { hasPasswordAuth, isFreshSession, requireAuth, toSocialProvider } from '@/utils/Auth';

export default async function EmailSettingsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'EmailSettingsPage',
  });

  const session = await requireAuth(true);
  const hasPasswordAccount = await hasPasswordAuth();

  const socialSignInProvider = toSocialProvider(session.session.signInProvider);

  let alertDescription;
  if (hasPasswordAccount) {
    // Confirm the change with the current password.
    alertDescription = t('verification_tip_description');
  } else if (!isFreshSession(session)) {
    // Require re-authentication with the social provider.
    alertDescription = t('verification_tip_description_social');
  } else {
    // Change email directly since the user has no password and has recently signed in with the social provider.
    alertDescription = t('verified_tip_description');
  }

  return (
    <DashboardSection
      title={t('section_title')}
      description={t('section_description')}
    >
      <Suspense>
        <SignInErrorHandler />
      </Suspense>

      <Alert className="mb-8">
        <Mail />
        <AlertTitle>
          {t('verification_tip_title')}
        </AlertTitle>
        <AlertDescription>
          {alertDescription}
        </AlertDescription>
      </Alert>

      {!hasPasswordAccount && socialSignInProvider && !isFreshSession(session)
        ? (
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label>{t('current_email_label')}</Label>
                <Input value={session.user.email} disabled />
              </div>

              <ChangeEmailFreshAuthButton
                currentEmail={session.user.email}
                provider={socialSignInProvider}
              />
            </div>
          )
        : <ChangeEmailForm currentEmail={session.user.email} passwordRequired={hasPasswordAccount} />}
    </DashboardSection>
  );
}
