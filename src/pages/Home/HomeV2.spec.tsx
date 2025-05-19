import { render, screen, renderHook } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import HomeV2 from './HomeV2';
import HomePic from '../../assets/photos/home-pic-01.jpg';

// Mock useTypewriter hook
jest.mock('@/hooks/useTypewriter', () => ({
  useTypewriter: () => 'Developer',
}));

describe('HomeV2', () => {
  const renderHomeV2 = () => {
    return render(
      <PageWrapper>
        <HomeV2 />
      </PageWrapper>
    );
  };

  test('renders all main content elements', () => {
    const t = renderHook(() => useTranslation());
    renderHomeV2();

    // Check main headings
    const h1Title = screen.getByRole('heading', { level: 1 });
    expect(h1Title).toBeInTheDocument();
    expect(screen.getByText('Gus')).toBeInTheDocument();
    // Check subtitle
    const h2Title = screen.getByRole('heading', { level: 2 });
    expect(h2Title).toBeInTheDocument();
    expect(h2Title).toHaveTextContent('Marini');
    // Check description
    const h3Title = screen.getByRole('heading', { level: 3 });
    expect(h3Title).toBeInTheDocument();
    expect(h3Title).toHaveTextContent(t.result.current.t('home:i_am'));
    expect(
      screen.getByText(t.result.current.t('home:description'))
    ).toBeInTheDocument();
  });

  test('renders with correct CSS classes', () => {
    renderHomeV2();

    const homeSection = screen.getByTestId('home');
    expect(homeSection).toBeInTheDocument();
    expect(homeSection).toHaveClass('home-page');

    const imageContainer = screen.getByAltText('profile-image');
    expect(imageContainer.closest('.image-container')).toBeInTheDocument();
  });

  test('changes image based on theme', () => {
    const { rerender } = renderHomeV2();

    // Check dark theme image
    let profileImage = screen.getByRole('img');
    expect(profileImage.parentElement).toHaveClass('image-container', 'bnw-bg');

    // Rerender with light theme
    rerender(
      <PageWrapper
        themeContext={{
          theme: 'light-theme',
          setTheme: jest.fn(),
          toggleTheme: jest.fn(),
        }}
      >
        <HomeV2 />
      </PageWrapper>
    );

    // Check light theme image
    profileImage = screen.getByRole('img');
    expect(profileImage.parentElement).toHaveClass('image-container');
  });

  test('renders typewriter effect', () => {
    renderHomeV2();

    const typewriterText = screen.getByText('Developer');
    expect(typewriterText).toHaveClass('typewriter-cursor-end');
  });

  test('renders profile image', () => {
    renderHomeV2();

    let profileImage = screen.getByRole('img');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', `${HomePic}`);
  });
});
