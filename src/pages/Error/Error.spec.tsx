import { render, screen } from '@testing-library/react';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import Error from './Error';
import { ErrorMessages } from '@/hooks/hooks.types';

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        wrong_route_error_title: 'Page Not Found',
        wrong_route_error: 'The page you are looking for does not exist.',
        generic_error_title: 'Oops! Something went wrong.',
        generic_error: 'An unexpected error occurred.',
        custom_error_title: 'Custom Error',
        custom_error: 'This is a custom error message.',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Error Page', () => {
  const renderError = (props = {}) => {
    return render(
      <PageWrapper>
        <Error {...props} />
      </PageWrapper>
    );
  };

  test('renders the error page with default content and code', () => {
    renderError();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Erro')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  test('renders the error page with custom error message and code', () => {
    renderError({
      errorCode: 500,
      errorMsg: ErrorMessages.INTERNAL_SERVER_ERROR,
    });

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred.')
    ).toBeInTheDocument();
  });

  test('renders the error page with default content and custom code', () => {
    renderError({
      errorCode: 403,
    });

    expect(screen.getByText('403')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  test('renders the error page with custom content and default code', () => {
    renderError({
      errorMsg: 'custom_error',
    });

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(
      screen.getByText('This is a custom error message.')
    ).toBeInTheDocument();
  });

  test('renders with correct CSS classes', () => {
    renderError();

    const errorSection = screen.getByTestId('error-page');
    expect(errorSection).toBeInTheDocument();
    expect(errorSection).toHaveClass('error-page');

    const imageContainer = screen.getByAltText('profile-image');
    expect(imageContainer.closest('.image-container')).toBeInTheDocument();
  });

  test('changes image based on theme', () => {
    const { rerender } = renderError();

    // Check dark theme image
    expect(screen.getByAltText('profile-image')).toBeInTheDocument();

    // Rerender with light theme
    rerender(
      <PageWrapper
        themeContext={{
          theme: 'light-theme',
          setTheme: jest.fn(),
          toggleTheme: jest.fn(),
        }}
      >
        <Error />
      </PageWrapper>
    );

    // Check light theme image
    expect(screen.getByAltText('profile-image-light')).toBeInTheDocument();
  });
});
