import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import { Navbar } from './Navbar';
import { useTranslation } from 'react-i18next';

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

describe('Navbar', () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
  });

  const renderNavbar = () => {
    return render(
      <PageWrapper>
        <Navbar />
      </PageWrapper>
    );
  };

  test('renders all navigation links', () => {
    const t = renderHook(() => useTranslation());
    renderNavbar();

    expect(
      screen.getByText(t.result.current.t('navbar:home'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('navbar:about'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('navbar:experience'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('navbar:contact'))
    ).toBeInTheDocument();
  });

  test('highlights active link', () => {
    const t = renderHook(() => useTranslation());
    renderNavbar();

    const aboutLink = screen.getByText(t.result.current.t('navbar:home'));
    expect(aboutLink).toHaveClass('selected');
  });

  test('toggles mobile menu when clicking menu button', () => {
    renderNavbar();

    const menuButton = screen.getByTestId('menu-btn');
    const menuCheckbox = screen.getByRole('checkbox');

    expect(menuCheckbox).not.toBeChecked();

    fireEvent.click(menuButton);
    expect(menuCheckbox).toBeChecked();

    fireEvent.click(menuButton);
    expect(menuCheckbox).not.toBeChecked();
  });

  test('closes mobile menu on navigation', () => {
    const t = renderHook(() => useTranslation());
    renderNavbar();

    const menuButton = screen.getByTestId('menu-btn');
    const menuCheckbox = screen.getByRole('checkbox');

    // Open menu
    fireEvent.click(menuButton);
    expect(menuCheckbox).toBeChecked();

    // Click on a navigation link
    const aboutLink = screen.getByText(t.result.current.t('navbar:about'));
    fireEvent.click(aboutLink);
    expect(menuCheckbox).not.toBeChecked();
  });

  test('scrolls to top on navigation', () => {
    const t = renderHook(() => useTranslation());
    renderNavbar();

    const aboutLink = screen.getByText(t.result.current.t('navbar:about'));
    fireEvent.click(aboutLink);

    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('renders with correct data attributes', () => {
    const t = renderHook(() => useTranslation());
    renderNavbar();

    const homeLink = screen.getByText(t.result.current.t('navbar:home'));
    expect(homeLink).toHaveAttribute(
      'data-name',
      t.result.current.t('navbar:home')
    );

    const aboutLink = screen.getByText(t.result.current.t('navbar:about'));
    expect(aboutLink).toHaveAttribute(
      'data-name',
      t.result.current.t('navbar:about')
    );
  });
});
