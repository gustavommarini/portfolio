import { renderHook, act } from '@testing-library/react';
import { useCookieConsent } from './useCookieConsent';

describe('useCookieConsent', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should show consent when no previous choice exists', () => {
    const { result } = renderHook(() => useCookieConsent());

    expect(result.current.showConsent).toBe(true);
    expect(result.current.hasConsented).toBe(null);
  });

  it('should not show consent when user has already accepted', () => {
    localStorage.setItem('cookie-consent', 'accepted');

    const { result } = renderHook(() => useCookieConsent());

    expect(result.current.showConsent).toBe(false);
    expect(result.current.hasConsented).toBe(true);
  });

  it('should not show consent when user has already declined', () => {
    localStorage.setItem('cookie-consent', 'declined');

    const { result } = renderHook(() => useCookieConsent());

    expect(result.current.showConsent).toBe(false);
    expect(result.current.hasConsented).toBe(false);
  });

  it('should accept cookies and update state', () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => {
      result.current.acceptCookies();
    });

    expect(result.current.showConsent).toBe(false);
    expect(result.current.hasConsented).toBe(true);
    expect(localStorage.getItem('cookie-consent')).toBe('accepted');
  });

  it('should decline cookies and update state', () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => {
      result.current.declineCookies();
    });

    expect(result.current.showConsent).toBe(false);
    expect(result.current.hasConsented).toBe(false);
    expect(localStorage.getItem('cookie-consent')).toBe('declined');
  });

  it('should close consent without making a choice', () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => {
      result.current.closeConsent();
    });

    expect(result.current.showConsent).toBe(false);
    expect(result.current.hasConsented).toBe(null);
    expect(localStorage.getItem('cookie-consent')).toBe(null);
  });
});
