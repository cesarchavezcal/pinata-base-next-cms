'use server';
import { prisma } from '@/lib';
import { User } from '@prisma/client';
import { getCurrentUser } from './get-current-user';

/**
 * Retrieves the profile of the current user.
 * @returns {Promise<User | null>} A promise that resolves to the user's profile if found, or null if the user is not authenticated.
 */
export const getProfile = async () => {
  const user = await getCurrentUser().then((user) => user as User | null);

  if (!user) {
    return null;
  }

  const profile: User | null = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
  });

  return profile;
};
