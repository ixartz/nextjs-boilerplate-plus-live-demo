import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '@/libs/Auth';

export const { POST, GET } = toNextJsHandler(auth);
