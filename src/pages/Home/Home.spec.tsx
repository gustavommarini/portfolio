import { useTranslation } from 'react-i18next';
import {
  render,
  renderHook,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import Home from './Home';
import HomeImg from '../../assets/photos/home.jpg';
import HomeImgLight from '../../assets/photos/home-light.jpg';

// Mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Mock timers for animation delays
jest.useFakeTimers();

describe('Home', () => {
  beforeEach(() => {
    mockedUsedNavigate.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('renders all main content elements', async () => {
    const t = renderHook(() => useTranslation());
    render(
      <PageWrapper>
        <Home />
      </PageWrapper>
    );
    // Check main heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    // Check title
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    // Check description
    expect(
      screen.getByText(t.result.current.t('home:description'))
    ).toBeInTheDocument();
    // Check buttons
    expect(
      screen.getByText(t.result.current.t('home:main_btn'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('home:secundary_btn'))
    ).toBeInTheDocument();
  });

  test('navigates to correct routes when buttons are clicked', async () => {
    const t = renderHook(() => useTranslation());
    render(
      <PageWrapper>
        <Home />
      </PageWrapper>
    );

    // Click profile button
    await act(async () => {
      fireEvent.click(screen.getByText(t.result.current.t('home:main_btn')));
    });
    await act(async () => {
      jest.advanceTimersByTime(300); // Advance timers by animation duration
    });
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/about');
    });

    // Click contact button
    await act(async () => {
      fireEvent.click(
        screen.getByText(t.result.current.t('home:secundary_btn'))
      );
    });
    await act(async () => {
      jest.advanceTimersByTime(300); // Advance timers by animation duration
    });
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/contact');
    });
  });

  test('changes background image based on theme', async () => {
    const { rerender } = render(
      <PageWrapper
        themeContext={{
          theme: 'dark-theme',
          setTheme: jest.fn(),
          toggleTheme: jest.fn(),
        }}
      >
        <Home />
      </PageWrapper>
    );

    // Check dark theme background
    const section = screen.getByTestId('home');
    expect(section).toHaveStyle({
      backgroundImage: `url(${HomeImg})`,
    });

    // Rerender with light theme
    rerender(
      <PageWrapper
        themeContext={{
          theme: 'light-theme',
          setTheme: jest.fn(),
          toggleTheme: jest.fn(),
        }}
      >
        <Home />
      </PageWrapper>
    );

    // Check light theme background
    expect(section).toHaveStyle({
      backgroundImage: `url(${HomeImgLight})`,
    });
  });
});
