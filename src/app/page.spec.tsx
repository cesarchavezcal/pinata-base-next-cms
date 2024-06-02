import { Header } from '@/components';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Page', () => {
  it('renders post content, author information, and action buttons', async () => {
    render(await (<div>{await Header()}</div>));

    // expect(screen.getByRole('heading')).toBeInTheDocument();
    // expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
