import { os } from '@orpc/server';
import { headers } from 'next/headers';
import { auth } from '@/libs/Auth';
import { API_ERROR } from '@/types/ApiError';

export const authProcedure = (freshSession?: boolean) =>
  os.errors({
    [API_ERROR.UNAUTHORIZED]: {},
  })
    .use(async ({ next, errors }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
        query: { disableCookieCache: freshSession },
      });

      if (!session) {
        throw errors.UNAUTHORIZED();
      }

      return next({
        context: {
          auth: {
            session,
          },
        },
      });
    });
