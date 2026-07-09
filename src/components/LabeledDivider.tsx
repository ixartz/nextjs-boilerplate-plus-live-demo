/**
 * Renders a horizontal divider with a centered label to separate sections.
 * @param props The component props.
 * @param props.label The text to display at the center of the divider.
 */
export const LabeledDivider = (props: { label: string }) => {
  return (
    <div className="
      relative my-6 text-center text-sm
      after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex
      after:items-center after:border-t after:border-border
    "
    >
      <span className="relative z-10 bg-card px-2 text-muted-foreground">
        {props.label}
      </span>
    </div>
  );
};
