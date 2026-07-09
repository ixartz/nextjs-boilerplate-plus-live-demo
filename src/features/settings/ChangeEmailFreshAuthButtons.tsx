import type { SocialAuthProvider } from '@/types/Auth';
import { useTranslations } from 'next-intl';
import { SocialAuthButton } from '@/features/auth/SocialAuthButtons';

export const ChangeEmailFreshAuthButton = (props: {
  currentEmail: string;
  provider: SocialAuthProvider;
}) => {
  const t = useTranslations('ChangeEmailFreshAuthButton');

  return (
    <div className="space-y-2">
      <SocialAuthButton
        provider={props.provider}
        callbackURL="/dashboard/settings/email"
        errorCallbackURL="/dashboard/settings/email"
        loginHint={props.currentEmail}
      />

      <p className="text-sm text-muted-foreground">
        {t('security_note')}
      </p>
    </div>
  );
};
