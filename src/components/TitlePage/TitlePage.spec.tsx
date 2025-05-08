import { render, screen } from '@testing-library/react';
import { TitlePage } from './TitlePage';

describe('TitlePage', () => {
  const renderTitlePage = (props = {}) => {
    return render(
      <TitlePage title="Test Title" subtitle="Test Subtitle" {...props} />
    );
  };

  test('renders title and subtitle', () => {
    renderTitlePage();

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  test('renders with HTML in title', () => {
    renderTitlePage({
      title: 'Test <span>Title</span>',
    });

    const titleElement = screen.getByText('Test');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.querySelector('span')).toHaveTextContent('Title');
  });

  test('sanitizes HTML in title', () => {
    renderTitlePage({
      title: 'Test <script>alert("xss")</script>Title',
    });

    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.querySelector('script')).not.toBeInTheDocument();
  });
});
