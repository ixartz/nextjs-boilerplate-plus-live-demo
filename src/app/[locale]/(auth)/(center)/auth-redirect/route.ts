import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { REDIRECT_URL_COOKIE_NAME } from '@/types/Auth';
import { safeRedirect } from '@/utils/Helpers';

export const GET = async (request: NextRequest) => {
  const cookieStore = await cookies();

  // Sanitize the fallback, since it may come from a user-controllable query parameter
  const fallbackUrl = safeRedirect(
    request.nextUrl.searchParams.get('fallback'),
    '/dashboard',
  );

  const redirectUrl = safeRedirect(
    cookieStore.get(REDIRECT_URL_COOKIE_NAME)?.value,
    fallbackUrl,
  );

  cookieStore.delete(REDIRECT_URL_COOKIE_NAME);
  redirect(redirectUrl);
};
