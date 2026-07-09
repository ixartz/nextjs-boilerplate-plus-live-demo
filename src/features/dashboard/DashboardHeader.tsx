export const DashboardHeader = (props: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}) => (
  <div className="mb-5">
    <div className="flex items-center gap-2 text-2xl font-bold">
      {props.icon}
      <span>{props.title}</span>
    </div>

    {props.description && (
      <div className="text-sm font-semibold text-muted-foreground">
        {props.description}
      </div>
    )}
  </div>
);
