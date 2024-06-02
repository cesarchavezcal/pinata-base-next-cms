import { prisma } from '@/lib/prisma/prisma-client.lib';
import { getCurrentUser } from './get-current-user';
import { getProfile } from './get-profile';

jest.mock('./get-current-user', () => ({
  getCurrentUser: jest.fn(),
}));

jest.mock('./../../lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
    },
  },
}));

describe('getProfile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if user is not authenticated', async () => {
    (getCurrentUser as jest.Mock).mockResolvedValueOnce(null);

    const result = await getProfile();

    expect(result).toBeNull();
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(prisma.user.findFirst).not.toHaveBeenCalled();
  });

  it('should return the user profile if user is authenticated', async () => {
    const data = {
      id: '659f7894cf3f25dffcaf468a',
      name: 'César Chávez',
      email: 'cesarchavezcal@gmail.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a/ACg8ocJwYWO7rhFHI6ypqt1v_JHLs0eoLviVsU0IhAwc_fN3OV0=s96-c',
      createdAt: '2024-01-11T05:11:48.437Z',
    };

    (getCurrentUser as jest.Mock).mockResolvedValueOnce(data);
    (prisma.user.findFirst as jest.Mock).mockResolvedValueOnce(data);

    const result = await getProfile();

    expect(result).toEqual(data);
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(prisma.user.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: {
        id: data?.id,
      },
    });
  });
});
