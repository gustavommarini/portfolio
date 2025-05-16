import { render, screen } from '@testing-library/react';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import Error from './Error';

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'generic_error_title') return 'Oops! Something went wrong.';
      if (key === 'wrong_route_error') return 'Route not found error message';
      return key;
    },
  }),
}));

describe('Error Page', () => {
  it('renders the error page with default content', () => {
    render(
      <PageWrapper>
        <Error />
      </PageWrapper>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Erro')).toBeInTheDocument();
    expect(screen.getByText('gustavommarini@gmail.com')).toBeInTheDocument();
  });

  it('renders the error page with custom error message', () => {
    render(
      <PageWrapper>
        <Error customErrorMsg="wrong_route_error" />
      </PageWrapper>
    );

    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText('Route not found error message')
    ).toBeInTheDocument();
  });

  it('renders error messages in multiple languages', () => {
    render(
      <PageWrapper>
        <Error />
      </PageWrapper>
    );

    const errorDescriptions = screen.getAllByRole('paragraph');
    expect(errorDescriptions).toHaveLength(3);

    // Check for language-specific content
    expect(screen.getByText(/An error has occurred/)).toBeInTheDocument();
    expect(screen.getByText(/Si è verificato un errore/)).toBeInTheDocument();
    expect(screen.getByText(/Ha ocurrido un error/)).toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    render(
      <PageWrapper>
        <Error />
      </PageWrapper>
    );

    const errorSection = screen.getByTestId('error-page');
    expect(errorSection).toBeInTheDocument();
    expect(errorSection).toHaveClass('error-page', 'container-xxl');
  });
});
