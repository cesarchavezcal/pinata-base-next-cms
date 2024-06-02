import { getDataFromVercelBlog, VercelBlogPostI } from './api-default';

describe('getDataFromVercelBlog', () => {
  it('should retrieve data from the Vercel Blog API', async () => {
    const post: VercelBlogPostI = {
      id: 1,
      title: 'Test Blog Post',
      content: 'Lorem ipsum dolor sit amet',
      author: 'John Doe',
      date: '2022-01-01',
      category: 'Technology',
    };
    // Mock the fetch function
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true, // or false if you want to simulate an error response
        status: 200, // or other status if needed
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        json: () => Promise.resolve([post]),
      } as Response),
    );
    global.fetch = mockFetch;

    // Call the function
    const result = await getDataFromVercelBlog();

    // Verify the result
    expect(result).toEqual([post]);

    // Verify that fetch was called with the correct URL
    expect(mockFetch).toHaveBeenCalledWith('https://api.vercel.app/blog');
  });
});
