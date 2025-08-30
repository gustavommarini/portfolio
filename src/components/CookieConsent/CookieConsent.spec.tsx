import { render, screen, fireEvent } from '@testing-library/react';
import { CookieConsent } from './CookieConsent';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../language/i18n';

// Mock the translation hook
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: 'Privacy Notice',
        description:
          'This website tracks user interactions to improve your experience.',
        close: 'Close',
        accept: 'I Understand',
        'tracking.title': 'Interaction Tracking',
        'tracking.description': 'We track how you interact with our website.',
        'preferences.title': 'Local Storage',
        'preferences.description':
          'Your theme and language preferences are stored locally.',
      };
      return translations[key] || key;
    },
  }),
}));

const renderWithI18n = (component: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);
};

describe('CookieConsent', () => {
  const mockOnAccept = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should not render when show is false', () => {
    renderWithI18n(
      <CookieConsent
        show={false}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByTestId('cookie-consent')).not.toBeInTheDocument();
  });

  it('should render when show is true', () => {
    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByTestId('cookie-consent')).toBeInTheDocument();
    expect(screen.getByText('Privacy Notice')).toBeInTheDocument();
  });

  it('should call onAccept when accept button is clicked', () => {
    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />
    );

    const acceptButton = screen.getByTestId('cookie-consent-accept');
    fireEvent.click(acceptButton);

    expect(mockOnAccept).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when close button is clicked', () => {
    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByTestId('cookie-consent-close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should have proper accessibility attributes', () => {
    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'cookie-consent-title');
    expect(dialog).toHaveAttribute(
      'aria-describedby',
      'cookie-consent-description'
    );
  });

  it('should store consent in localStorage when accept is clicked', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />
    );

    const acceptButton = screen.getByTestId('cookie-consent-accept');
    fireEvent.click(acceptButton);

    expect(setItemSpy).toHaveBeenCalledWith('cookie-consent', 'accepted');
  });

  it('should display tracking and preferences sections', () => {
    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Interaction Tracking')).toBeInTheDocument();
    expect(screen.getByText('Local Storage')).toBeInTheDocument();
  });

  it('should not display decline button', () => {
    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />
    );

    expect(
      screen.queryByTestId('cookie-consent-decline')
    ).not.toBeInTheDocument();
  });
});
