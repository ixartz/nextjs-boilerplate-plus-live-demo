import { cn } from '@/utils/Helpers';

export const DashboardSection = (props: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('max-w-3xl', props.className)}>
    {(props.title || props.description) && (
      <div className="mb-5">
        {props.title && (
          <div className="text-lg font-semibold">{props.title}</div>
        )}
        {props.description && (
          <div className="text-sm font-medium text-muted-foreground">
            {props.description}
          </div>
        )}
      </div>
    )}

    {props.children}
  </div>
);
