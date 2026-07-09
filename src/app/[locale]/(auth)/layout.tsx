import { setRequestLocale } from 'next-intl/server';
import { Toaster } from '@/components/ui/sonner';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <Toaster position="top-center" expand closeButton />

      {props.children}
    </>
  );
}
