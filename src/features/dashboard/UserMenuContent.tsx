'use client';

import { UserCog } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/useSidebar';
import { Link } from '@/libs/I18nNavigation';
import { UserLogout } from './UserLogout';

export const UserMenuContent = () => {
  const t = useTranslations('UserMenu');
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      side="bottom"
      align="end"
      sideOffset={4}
    >
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => {
            if (isMobile) {
              toggleSidebar();
            }
          }}
          asChild
        >
          <Link href="/dashboard/settings">
            <UserCog />
            {t('manage_account')}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <UserLogout />
    </DropdownMenuContent>
  );
};
