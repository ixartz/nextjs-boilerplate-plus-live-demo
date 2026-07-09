import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const AppHeader = () => (
  <header className="
    flex h-16 shrink-0 items-center justify-between gap-2 border-b px-2
  "
  >
    <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
    </div>

    <ul className="flex items-center gap-x-1.5">
      <li>
        <ThemeSwitcher />
      </li>

      <li>
        <LocaleSwitcher />
      </li>
    </ul>
  </header>
);
