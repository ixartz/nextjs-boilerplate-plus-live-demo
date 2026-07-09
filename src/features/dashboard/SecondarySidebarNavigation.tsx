import { Link } from '@/libs/I18nNavigation';

export const SecondarySidebarNavigation = (props: {
  label: string;
  items: {
    title: string;
    url: string;
    icon: React.ReactNode;
  }[];
}) => (
  <div>
    <div className="
      hidden px-1 text-sm font-semibold text-sidebar-foreground/70
      lg:block
    "
    >
      {props.label}
    </div>

    <ul className="
      mt-2 flex gap-2
      lg:block lg:space-y-1
    "
    >
      {props.items.map(item => (
        <li key={item.title}>
          <Link
            href={item.url}
            className="
              flex items-center gap-2 rounded-md px-3 py-2 text-sm
              whitespace-nowrap
              hover:bg-accent
              [&_svg]:size-4
            "
          >
            {item.icon}
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
