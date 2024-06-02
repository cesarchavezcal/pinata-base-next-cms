import { getProfile } from '@/actions';
import { Avatar, Box, Flex, Text } from '@radix-ui/themes';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UserPopover from '../dropdown/user-dropdown';
import { Header } from './header';

jest.mock('./../../../actions/auth/get-profile', () => ({
  getProfile: jest.fn(),
}));

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the heading', async () => {
    render(await Header());
    const heading = screen.getByRole('title');
    expect(heading).toHaveTextContent('🪅 Piñata Template');
  });

  it('renders the user image, name, and email', async () => {
    (getProfile as jest.Mock).mockResolvedValueOnce({
      name: 'César Chávez',
      email: 'cesarchavezcal@gmail.com',
      image:
        'https://lh3.googleusercontent.com/a/ACg8ocJwYWO7rhFHI6ypqt1v_JHLs0eoLviVsU0IhAwc_fN3OV0=s96-c',
    });
    const result = await getProfile();

    render(
      <UserPopover>
        <Flex gap="3" align="center">
          <Avatar
            role="user__img"
            size="3"
            src={result?.image as string}
            radius="full"
            fallback={result?.name as string}
          />
          <Box display={{ initial: 'none', xs: 'block' }}>
            <Text as="p" size="2" weight="bold" highContrast role="user__name">
              {result?.name}
            </Text>
            <Text as="p" size="1" role="user__email">
              {result?.email}
            </Text>
          </Box>
        </Flex>
      </UserPopover>,
    );

    // Check if the user's name is displayed
    const name = screen.getByRole('user__name');
    expect(name).toHaveTextContent(result?.name as string);

    // Check if the user's email is displayed
    const email = screen.getByRole('user__email');
    expect(email).toHaveTextContent(result?.email as string);
  });
});
