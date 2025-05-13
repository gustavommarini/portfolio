import { render, screen, fireEvent } from '@testing-library/react';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import { ThemeButton } from './ThemeButton';

describe('ThemeButton', () => {
  const mockToggleTheme = jest.fn();

  const renderThemeButton = (theme = 'dark-theme') => {
    return render(
      <PageWrapper
        themeContext={{
          theme,
          toggleTheme: mockToggleTheme,
          setTheme: jest.fn(),
        }}
      >
        <ThemeButton />
      </PageWrapper>
    );
  };

  beforeEach(() => {
    mockToggleTheme.mockClear();
  });

  test('renders with dark theme icon', () => {
    renderThemeButton('dark-theme');

    const icon = screen.getByRole('icon', { hidden: true });
    expect(icon).toHaveClass('fa-solid', 'fa-sun');
  });

  test('renders with light theme icon', () => {
    renderThemeButton('light-theme');

    const icon = screen.getByRole('icon', { hidden: true });
    expect(icon).toHaveClass('fa-solid', 'fa-moon');
  });

  test('calls toggleTheme when clicked', () => {
    renderThemeButton();

    const button = screen.getByTestId('button-theme-toggle');
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
