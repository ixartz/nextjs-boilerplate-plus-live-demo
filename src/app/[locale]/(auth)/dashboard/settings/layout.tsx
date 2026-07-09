import { CreditCard, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SecondarySidebar } from '@/features/dashboard/SecondarySidebar';
import { SecondarySidebarNavigation } from '@/features/dashboard/SecondarySidebarNavigation';
import { hasPasswordAuth } from '@/utils/Auth';

export default async function SettingsLayout(props: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'SettingsLayout',
  });

  const showSecuritySection = await hasPasswordAuth();

  return (
    <SecondarySidebar
      sections={(
        <>
          <SecondarySidebarNavigation
            label={t('account_section_label')}
            items={[
              {
                title: t('profile_item'),
                url: '/dashboard/settings',
                icon: <User />,
              },
              {
                title: t('email_item'),
                url: '/dashboard/settings/email',
                icon: <Mail />,
              },
              {
                title: t('billing_item'),
                url: '/dashboard/settings/billing',
                icon: <CreditCard />,
              },
            ]}
          />

          {showSecuritySection && (
            <SecondarySidebarNavigation
              label={t('security_section_label')}
              items={[
                {
                  title: t('password_item'),
                  url: '/dashboard/settings/password',
                  icon: <Lock />,
                },
                {
                  title: t('mfa_item'),
                  url: '/dashboard/settings/mfa',
                  icon: <ShieldCheck />,
                },
              ]}
            />
          )}
        </>
      )}
    >
      {props.children}
    </SecondarySidebar>
  );
}
