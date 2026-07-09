import { setRequestLocale } from 'next-intl/server';
import { CenteredContainer } from '@/features/dashboard/CenteredContainer';
import { Logo } from '@/templates/Logo';

// CenteredLayout provides a vertically and horizontally centered container for unauthenticated users.
// Used for sign-in, sign-up, and password reset flows to create a focused, centered user experience.
export default async function CenteredLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <CenteredContainer>
      <Logo />

      {props.children}
    </CenteredContainer>
  );
}
