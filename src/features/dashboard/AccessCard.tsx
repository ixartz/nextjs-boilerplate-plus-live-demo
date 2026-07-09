import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/Helpers';

export const AccessCard = (props: {
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) => (
  <Card
    className={cn('w-full max-w-sm overflow-hidden', props.className, {
      'pb-0': props.footer,
    })}
  >
    <CardHeader className="text-center">
      <CardTitle className="text-xl">{props.title}</CardTitle>
      <CardDescription>{props.description}</CardDescription>
    </CardHeader>
    <CardContent>
      {props.children}
    </CardContent>
    {props.footer && (
      <CardFooter className="
        justify-center bg-muted py-4 text-xs whitespace-pre
        text-muted-foreground
      "
      >
        {props.footer}
      </CardFooter>
    )}
  </Card>
);
