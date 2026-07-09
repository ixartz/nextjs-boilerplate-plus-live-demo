import { socialAuthProviders } from '@/libs/Auth';
import { SocialAuthButton } from './SocialAuthButtons';

export const AuthButtons = () => {
  return (
    <div className="space-y-4">
      {socialAuthProviders.map(provider => (
        <SocialAuthButton
          key={provider}
          provider={provider}
          callbackURL="/auth-redirect"
          errorCallbackURL="/sign-in"
          className="w-full"
        />
      ))}
    </div>
  );
};
