import { prisma } from '@/lib';
import { Idea } from '@prisma/client';

/**
 * Retrieves all blog posts from the database.
 * @returns A promise that resolves to an array of Post objects.
 */
export const fetchIdeasAction = async (): Promise<Idea[]> => {
  return await prisma.idea.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
};
