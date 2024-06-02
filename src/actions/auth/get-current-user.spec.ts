import { getCurrentUser } from '@/actions/auth/get-current-user';
// Mock the auth function to return null
jest.mock('./../../lib/auth/auth', () => ({
  ...jest.requireActual('./../../lib/auth/auth'),
  auth: jest
    .fn()
    .mockReturnValueOnce({
      user: {
        name: 'César Chávez',
        email: 'cesarchavezcal@gmail.com',
        image:
          'https://lh3.googleusercontent.com/a/ACg8ocJQkjYlhtSzOYslUw3pWJ4Do2jLWnefoYbZsi5i8pevIRgl9BtD=s96-c',
      },
      expires: '2024-06-07T18:50:03.222Z',
    })
    .mockReturnValueOnce(null)
    .mockReturnValue(null),
}));

describe('getCurrentUser', () => {
  it('should return the current user session', async () => {
    // Arrange
    const data = {
      user: {
        name: 'César Chávez',
        email: 'cesarchavezcal@gmail.com',
        image:
          'https://lh3.googleusercontent.com/a/ACg8ocJQkjYlhtSzOYslUw3pWJ4Do2jLWnefoYbZsi5i8pevIRgl9BtD=s96-c',
      },
      expires: '2024-06-07T18:50:03.222Z',
    };
    // Action
    const user = await getCurrentUser();
    // Assert
    expect(user).toEqual(data);
  });

  it('should return null if no session exists', async () => {
    // Action
    const user = await getCurrentUser();
    // Assert
    expect(user).toBeNull();
  });
});
