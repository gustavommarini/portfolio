import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import '@/test-utils/envMock';
import { socialprofiles } from '@/services';
import { SocialIcons } from './SocialIcons';
import { PageWrapper } from '@/test-utils';

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('SocialIcons', () => {
  beforeEach(() => {
    // Mock the translation hook implementation
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => (key === 'follow_me' ? 'Follow Me' : key),
    });
  });

  test('renders follow me text', () => {
    render(<SocialIcons />);
    expect(screen.getByText('Follow Me')).toBeInTheDocument();
  });

  test('renders all social profile links', () => {
    render(
      <PageWrapper>
        <SocialIcons />
      </PageWrapper>
    );

    // Check if all social profiles are rendered
    Object.entries(socialprofiles).forEach(([platform]) => {
      const link = screen.getByRole('link', {
        name: `Visit my ${platform} profile`,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  test('social links have correct href attributes', () => {
    render(
      <PageWrapper>
        <SocialIcons />
      </PageWrapper>
    );

    Object.entries(socialprofiles).forEach(([platform, url]) => {
      const link = screen.getByRole('link', {
        name: `Visit my ${platform} profile`,
      });
      expect(link).toHaveAttribute('href', url);
    });
  });

  test('renders social icons with correct classes', () => {
    render(
      <PageWrapper>
        <SocialIcons />
      </PageWrapper>
    );

    Object.entries(socialprofiles).forEach(([platform]) => {
      const link = screen.getByRole('link', {
        name: `Visit my ${platform} profile`,
      });
      const icon = link.querySelector('i');
      expect(icon).toHaveClass('fa-brands');
    });
  });
});
