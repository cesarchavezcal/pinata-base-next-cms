'use server';

export interface VercelBlogPostI {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

/**
 * Retrieves data from the Vercel Blog API.
 * @returns A promise that resolves to an array of VercelBlogPostI objects.
 */
export const getDataFromVercelBlog = async (): Promise<VercelBlogPostI[]> => {
  const res = fetch('https://api.vercel.app/blog').then((res) => res.json());
  const data = await res;
  return data;
};
