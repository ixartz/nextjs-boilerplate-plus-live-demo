export const PageMessage = (props: {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  button?: React.ReactNode;
}) => (
  <div className="flex h-full flex-col items-center justify-center">
    <div className="
      size-16 rounded-full bg-muted p-3
      [&_svg]:stroke-muted-foreground [&_svg]:stroke-2
    "
    >
      {props.icon}
    </div>

    <div className="mt-3 mb-24 text-center">
      <div className="text-xl font-semibold">{props.title}</div>
      <div className="mt-3 text-sm font-medium text-muted-foreground">
        {props.description}
      </div>

      {props.button && (
        <div className="mt-5">{props.button}</div>
      )}
    </div>
  </div>
);
