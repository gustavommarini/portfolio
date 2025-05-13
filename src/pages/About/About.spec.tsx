import {
  render,
  screen,
  fireEvent,
  renderHook,
  within,
} from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import { contactConfig } from '@/services';
import ProfileImage from '../../assets/photos/about.jpg';
import ProfileImageLight from '../../assets/photos/about-light.jpg';
import About from './About';

// Mock window.print
const mockPrint = jest.fn();
Object.defineProperty(window, 'print', {
  value: mockPrint,
  writable: true,
});

describe('About', () => {
  beforeEach(() => {
    mockPrint.mockClear();
  });

  const renderAbout = (theme = 'dark-theme') => {
    return render(
      <PageWrapper
        themeContext={{
          theme,
          toggleTheme: jest.fn(),
          setTheme: jest.fn(),
        }}
      >
        <About />
      </PageWrapper>
    );
  };

  //   test('renders main sections', () => {
  //     renderAbout();

  //     expect(
  //       screen.getByRole('heading', { name: /about:title/i })
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByRole('heading', { name: /about:description.title/i })
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByRole('heading', { name: /about:title-work/i })
  //     ).toBeInTheDocument();
  //   });

  test('renders profile image based on theme', () => {
    // Dark theme
    const { rerender } = renderAbout('dark-theme');
    let profileImage = screen.getByRole('img');
    expect(profileImage).toHaveAttribute('src', `${ProfileImage}`);

    // Light theme
    rerender(
      <PageWrapper
        themeContext={{
          theme: 'light-theme',
          toggleTheme: jest.fn(),
          setTheme: jest.fn(),
        }}
      >
        <About />
      </PageWrapper>
    );
    profileImage = screen.getByRole('img');
    expect(profileImage).toHaveAttribute('src', `${ProfileImageLight}`);
  });

  test('renders contact information', () => {
    renderAbout();

    expect(screen.getByText(contactConfig.email)).toBeInTheDocument();
    expect(screen.getByText(contactConfig.site)).toBeInTheDocument();
    expect(screen.getByText(contactConfig.phone_formated)).toBeInTheDocument();
  });

  test('renders personal details', () => {
    const t = renderHook(() => useTranslation());
    renderAbout();

    expect(
      screen.getByText(t.result.current.t('about:details.birthday') + ':')
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('about:details.residence') + ':')
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('about:details.languages') + ':')
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('about:details.experience') + ':')
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('about:details.nationality') + ':')
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('about:details.freelance') + ':')
    ).toBeInTheDocument();
  });

  test('triggers print when clicking download CV button', () => {
    const t = renderHook(() => useTranslation());
    renderAbout();

    const downloadButton = screen.getByRole('button', {
      name: t.result.current.t('about:btn_dwn_cv'),
    });
    fireEvent.click(downloadButton);

    expect(mockPrint).toHaveBeenCalledTimes(1);
  });

  test('renders education, course and language sections', () => {
    const t = renderHook(() => useTranslation());
    renderAbout();

    expect(
      screen.getByText(t.result.current.t('about:edu_section_title'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('about:course_section_title'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('about:lang_section_title'))
    ).toBeInTheDocument();
  });

  test('renders print-only content', () => {
    const t = renderHook(() => useTranslation());
    renderAbout();

    const { getByText } = within(screen.getByTestId('work-only-print'));
    expect(
      getByText(t.result.current.t('about:title-work'))
    ).toBeInTheDocument();
  });
});
