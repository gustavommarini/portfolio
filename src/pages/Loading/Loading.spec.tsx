import { render, screen } from '@testing-library/react';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import Loading from './Loading';

describe('Loading Page', () => {
  it('renders the loading page with correct structure', () => {
    render(
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );

    const loadingSection = screen.getByTestId('loading-page');
    expect(loadingSection).toBeInTheDocument();
    expect(loadingSection).toHaveClass('loading-page', 'container-xxl');
  });

  it('contains the LoadingSpinner component', () => {
    render(
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
