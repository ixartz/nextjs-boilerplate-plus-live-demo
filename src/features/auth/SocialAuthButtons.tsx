'use client';

import type { SocialAuthProvider } from '@/types/Auth';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { SocialProviderIcon } from '@/components/SocialProviderIcon';
import { Button } from '@/components/ui/button';
import { authClient } from '@/libs/AuthClient';
import { cn } from '@/utils/Helpers';
import { getAuthErrorMessage } from '@/utils/Helpers.client';

export const SocialAuthButton = (props: {
  provider: SocialAuthProvider;
  callbackURL: string;
  errorCallbackURL: string;
  loginHint?: string;
  className?: string;
}) => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('SocialAuthButtons');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSocialSignIn = async (provider: SocialAuthProvider) => {
    setIsRedirecting(true);

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: props.callbackURL,
      errorCallbackURL: props.errorCallbackURL,
      loginHint: props.loginHint,
    });

    if (error) {
      toast.error(getAuthErrorMessage(tBetterAuthError, error));
    }

    setIsRedirecting(false);
  };

  return (
    <Button
      className={cn('[&_svg]:fill-current', props.className)}
      variant="outline"
      onClick={() => handleSocialSignIn(props.provider)}
      disabled={isRedirecting}
    >
      <SocialProviderIcon provider={props.provider} />
      {t('continue_with', { provider: t(props.provider) })}
    </Button>
  );
};
