import { eq } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { user } from '@/models/AuthSchema';

// Prefer Better Auth APIs for normal workflows.
// These functions are reserved for places where Better Auth is initializing,
// unavailable, or would need to call back into itself.

export const getUserByEmail = (email: string) => {
  return db.query.user.findFirst({
    where: eq(user.email, email),
  });
};
