import { ChevronsUpDown } from 'lucide-react';
import { IdentityAvatar } from '@/components/IdentityAvatar';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { sidebarMenuButtonVariants } from '@/components/ui/sidebarVariants';
import { requireAuth } from '@/utils/Auth';
import { cn } from '@/utils/Helpers';
import { UserMenuContent } from './UserMenuContent';

export const UserMenu = async () => {
  const session = await requireAuth();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            data-size="lg"
            className={cn(
              sidebarMenuButtonVariants({ size: 'lg' }),
              `
                data-[state=open]:bg-sidebar-accent
                data-[state=open]:text-sidebar-accent-foreground
              `,
            )}
          >
            <IdentityAvatar primaryLabel={session.user.name} secondaryLabel={session.user.email} />
            <ChevronsUpDown className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <UserMenuContent />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
