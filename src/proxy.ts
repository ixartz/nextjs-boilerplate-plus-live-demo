import type { NextFetchEvent, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { auth } from '@/libs/Auth';
import { routing } from '@/libs/I18nRouting';
import { parseI18nPath } from '@/utils/Helpers';
import { REDIRECT_URL_COOKIE_NAME } from './types/Auth';

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = ['dashboard'];

const isProtectedRoute = (firstSegment: string) => {
  return protectedRoutes.includes(firstSegment);
};

type RedirectTarget = {
  path: string;
  redirectUrl?: string;
};

export default async function proxy(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  const { locale, firstSegment, normalizedPath } = parseI18nPath(request.nextUrl.pathname);

  if (isProtectedRoute(firstSegment)) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    let target: RedirectTarget | null = null;

    // Redirect to sign-in if the user is not authenticated
    if (!session) {
      target = {
        path: '/sign-in',
        redirectUrl: `${normalizedPath}${request.nextUrl.search}`,
      };
    }

    // Perform the redirect if needed
    if (target && normalizedPath !== target.path) {
      const url = new URL(`/${locale}${target.path}`, request.url);
      const response = NextResponse.redirect(url);

      if (target.redirectUrl) {
        response.cookies.set(REDIRECT_URL_COOKIE_NAME, target.redirectUrl, {
          httpOnly: true,
          maxAge: 30 * 60, // 30 minutes in seconds
          path: '/',
          sameSite: 'lax',
          secure: request.nextUrl.protocol === 'https:',
        });
      }

      return response;
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next`, `/_vercel` or `monitoring`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!_next|_vercel|monitoring|better-auth|rpc|api|.*\\..*).*)',
};
