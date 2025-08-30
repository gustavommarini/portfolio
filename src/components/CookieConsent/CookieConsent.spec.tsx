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
        title: 'Cookie Consent',
        description: 'We use cookies to enhance your browsing experience.',
        close: 'Close',
        accept: 'Accept All',
        decline: 'Decline',
        'necessary.title': 'Necessary Cookies',
        'necessary.description': 'These cookies are essential.',
        'analytics.title': 'Analytics Cookies',
        'analytics.description': 'These cookies help us understand.',
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
  const mockOnDecline = jest.fn();
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
        onDecline={mockOnDecline}
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
        onDecline={mockOnDecline}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByTestId('cookie-consent')).toBeInTheDocument();
    expect(screen.getByText('Cookie Consent')).toBeInTheDocument();
  });

  it('should call onAccept when accept button is clicked', () => {
    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onDecline={mockOnDecline}
        onClose={mockOnClose}
      />
    );

    const acceptButton = screen.getByTestId('cookie-consent-accept');
    fireEvent.click(acceptButton);

    expect(mockOnAccept).toHaveBeenCalledTimes(1);
  });

  it('should call onDecline when decline button is clicked', () => {
    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onDecline={mockOnDecline}
        onClose={mockOnClose}
      />
    );

    const declineButton = screen.getByTestId('cookie-consent-decline');
    fireEvent.click(declineButton);

    expect(mockOnDecline).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when close button is clicked', () => {
    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onDecline={mockOnDecline}
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
        onDecline={mockOnDecline}
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
        onDecline={mockOnDecline}
        onClose={mockOnClose}
      />
    );

    const acceptButton = screen.getByTestId('cookie-consent-accept');
    fireEvent.click(acceptButton);

    expect(setItemSpy).toHaveBeenCalledWith('cookie-consent', 'accepted');
  });

  it('should store decline in localStorage when decline is clicked', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    renderWithI18n(
      <CookieConsent
        show={true}
        onAccept={mockOnAccept}
        onDecline={mockOnDecline}
        onClose={mockOnClose}
      />
    );

    const declineButton = screen.getByTestId('cookie-consent-decline');
    fireEvent.click(declineButton);

    expect(setItemSpy).toHaveBeenCalledWith('cookie-consent', 'declined');
  });
});
