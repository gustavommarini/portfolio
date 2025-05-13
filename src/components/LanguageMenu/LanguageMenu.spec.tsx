import { render, screen, fireEvent } from '@testing-library/react';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import { LanguageMenu } from './LanguageMenu';
import { AvailableLanguages } from '@/language/i18n.types';

// Mock i18n
const mockChangeLanguage = jest.fn();
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe('LanguageMenu', () => {
  beforeEach(() => {
    mockChangeLanguage.mockClear();
  });

  const renderLanguageMenu = (initialLanguage = AvailableLanguages.en) => {
    jest
      .spyOn(require('react-i18next'), 'useTranslation')
      .mockImplementation(() => ({
        i18n: {
          language: initialLanguage,
          changeLanguage: mockChangeLanguage,
        },
      }));

    return render(
      <PageWrapper>
        <LanguageMenu />
      </PageWrapper>
    );
  };

  test('renders language selector button', () => {
    renderLanguageMenu();

    const button = screen.getByTestId('language-btn');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('i')).toHaveClass('fa-solid', 'fa-language');
  });

  test('renders all language options', () => {
    renderLanguageMenu();

    expect(screen.getByText('🇪🇸')).toBeInTheDocument();
    expect(screen.getByText('🇬🇧')).toBeInTheDocument();
    expect(screen.getByText('🇮🇹')).toBeInTheDocument();
  });

  test('highlights current language', () => {
    renderLanguageMenu(AvailableLanguages.es);

    const spanishFlag = screen.getByText('🇪🇸');
    expect(spanishFlag).toHaveClass('selected');
  });

  test('changes language when clicking a flag', () => {
    renderLanguageMenu();

    const spanishFlag = screen.getByText('🇪🇸');
    fireEvent.click(spanishFlag);

    expect(mockChangeLanguage).toHaveBeenCalledWith(AvailableLanguages.es);
  });

  test('toggles language menu when clicking button', () => {
    renderLanguageMenu();

    const button = screen.getByTestId('language-btn');
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    fireEvent.click(button);
    expect(checkbox).toBeChecked();

    fireEvent.click(button);
    expect(checkbox).not.toBeChecked();
  });

  test('closes menu after language change', () => {
    renderLanguageMenu();

    const button = screen.getByTestId('language-btn');
    const checkbox = screen.getByRole('checkbox');

    // Open menu
    fireEvent.click(button);
    expect(checkbox).toBeChecked();

    // Change language
    const spanishFlag = screen.getByText('🇪🇸');
    fireEvent.click(spanishFlag);

    expect(checkbox).not.toBeChecked();
  });
});
