'use client';

import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { authClient } from '@/libs/AuthClient';
import { useRouter } from '@/libs/I18nNavigation';
import { getAuthErrorMessage } from '@/utils/Helpers.client';

export const UserLogout = () => {
  const tBetterAuthError = useTranslations('BetterAuthError');
  const t = useTranslations('UserMenu');
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(getAuthErrorMessage(tBetterAuthError, error));
      return;
    }

    router.push('/');
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      {t('logout')}
    </DropdownMenuItem>
  );
};
