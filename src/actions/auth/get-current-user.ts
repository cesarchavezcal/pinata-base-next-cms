import { auth } from '@/lib';
import { Session } from 'next-auth';

/**
 * Retrieves the current user session.
 * @returns A promise that resolves to the current user session or null if no session exists.
 */
export async function getCurrentUser(): Promise<Session | null> {
  return await auth();
}
