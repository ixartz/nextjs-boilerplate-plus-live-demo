export type EmailTemplate<P extends object> = React.ComponentType<P> & {
  Subject: (props: P) => Promise<string> | string;
  PreviewProps?: P;
};
