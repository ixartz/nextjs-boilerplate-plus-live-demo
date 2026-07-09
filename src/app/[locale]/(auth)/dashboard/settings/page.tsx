import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { DashboardSection } from '@/features/dashboard/DashboardSection';
import { ProfileNameForm } from '@/features/settings/ProfileNameForm';
import { Link } from '@/libs/I18nNavigation';
import { requireAuth } from '@/utils/Auth';

export default async function ProfileSettingsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'ProfileSettingsPage',
  });

  const session = await requireAuth(true);

  return (
    <DashboardSection
      title={t('section_title')}
      description={t('section_description')}
    >
      <ProfileNameForm defaultValues={{ name: session.user.name }} />

      <Separator className="my-6" />

      <div className="grid gap-2">
        <Label>{t('email_label')}</Label>
        <Input value={session.user.email} disabled />
        <p className="text-sm text-muted-foreground">
          {t.rich('email_description', {
            link: chunks => (
              <Link
                href="/dashboard/settings/email"
                className="
                  text-primary underline
                  hover:no-underline
                "
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </DashboardSection>
  );
}
