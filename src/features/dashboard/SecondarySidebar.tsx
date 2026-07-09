export const SecondarySidebar = (props: {
  sections: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div
    className="
      flex h-full flex-col
      lg:flex-row
    "
    data-layout-padded="false"
  >
    <div className="
      flex shrink-0 items-center gap-2 overflow-x-auto border-b bg-muted/20 p-3
      lg:block lg:w-64 lg:space-y-6 lg:border-r lg:py-6
    "
    >
      {props.sections}
    </div>

    <div className="
      @container flex-1 p-4
      sm:p-6
    "
    >
      {props.children}
    </div>
  </div>
);
