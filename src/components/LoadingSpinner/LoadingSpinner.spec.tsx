import { render, screen } from '@testing-library/react';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default loading text', () => {
    render(
      <PageWrapper>
        <LoadingSpinner />
      </PageWrapper>
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders with custom loading text', () => {
    const customText = 'Please wait...';
    render(
      <PageWrapper>
        <LoadingSpinner loadingText={customText} />
      </PageWrapper>
    );

    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    render(
      <PageWrapper>
        <LoadingSpinner />
      </PageWrapper>
    );

    const spinnerElement = screen.getByText('Loading');
    expect(spinnerElement).toHaveClass('ring');
  });
});
