import { render, screen } from '@testing-library/react';
import { TitlePageV2 } from './TitlePageV2';

describe('TitlePageV2', () => {
  const renderTitlePageV2 = (props = {}) => {
    return render(
      <TitlePageV2
        title="Test1 <span>Title</span>"
        subtitle="Test Subtitle"
        {...props}
      />
    );
  };

  test('renders title and subtitle for TitlePageV2', () => {
    renderTitlePageV2();

    // Check if the title is split correctly
    expect(screen.getByText('Test1')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  test('renders title without span tag', () => {
    renderTitlePageV2({
      title: 'Simple Title',
    });

    expect(screen.getByText('Simple Title')).toBeInTheDocument();
    const pageId = screen.getByTestId('page-title');
    expect(pageId.firstChild?.lastChild).toBeEmptyDOMElement();
  });

  test('renders with correct CSS classes', () => {
    renderTitlePageV2();

    const titleContainer = screen.getByText('Test1').closest('.page-title');
    expect(titleContainer).toHaveClass('page-title', 'page-version-two');

    const firstTitle = screen.getByText('Test1').closest('.first-h1');
    expect(firstTitle).toBeInTheDocument();

    const secondTitle = screen.getByText('Title').closest('.second-h1');
    expect(secondTitle).toBeInTheDocument();
  });

  test('handles empty title', () => {
    renderTitlePageV2({
      title: '',
    });
    // const h1Title = screen.getByRole('heading');
    // expect(h1Title).not.toBeInTheDocument();
    const pageId = screen.getByTestId('page-title');
    expect(pageId.lastChild).toHaveClass('page-subtitle');
    expect(pageId.childElementCount).toBe(1);
  });

  test('handles empty subtitle', () => {
    renderTitlePageV2({
      subtitle: '',
    });
    const h1Title = screen.getByRole('heading', { level: 1 });
    expect(h1Title).toBeInTheDocument();
    const pageId = screen.getByTestId('page-title');
    expect(pageId.childElementCount).toBe(1);
  });
});
