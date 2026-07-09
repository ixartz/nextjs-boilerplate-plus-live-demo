import { CirclePlus, Home, LifeBuoy, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { Logo } from '@/templates/Logo';
import { AppConfig } from '@/utils/AppConfig';
import { SidebarNavigation } from './SidebarNavigation';
import { UserMenu } from './UserMenu';

export const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  const t = useTranslations('AppSidebar');

  return (
    <Sidebar {...props}>
      <SidebarHeader className="pt-5">
        <div className="flex justify-center pb-3">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation
          label={t('main_section')}
          items={[
            {
              title: t('home'),
              url: '/dashboard',
              icon: <Home />,
            },
            {
              title: t('todos'),
              url: '/dashboard/todos',
              icon: <CirclePlus />,
            },
          ]}
        />
        <SidebarNavigation
          items={[
            {
              title: t('support'),
              url: `mailto:${AppConfig.email.support}`,
              icon: <LifeBuoy />,
            },
            {
              title: t('feedback'),
              url: `mailto:${AppConfig.email.support}`,
              icon: <Send />,
            },
          ]}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
