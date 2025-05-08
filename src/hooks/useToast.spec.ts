import { renderHook, act } from '@testing-library/react';
import '@/test-utils/envMock';
import { ToastTypes } from '@/components';
import { useToast } from './useToast';

describe('useToast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should initialize with default values', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toastVisible).toBe(false);
    expect(result.current.toastMsg).toBe('');
    expect(result.current.toastType).toBe(ToastTypes.info);
  });

  test('should show toast with success message', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToastOptions('Success message', ToastTypes.success);
    });

    expect(result.current.toastVisible).toBe(true);
    expect(result.current.toastMsg).toBe('Success message');
    expect(result.current.toastType).toBe(ToastTypes.success);
  });

  test('should show toast with error message', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToastOptions('Error message', ToastTypes.error);
    });

    expect(result.current.toastVisible).toBe(true);
    expect(result.current.toastMsg).toBe('Error message');
    expect(result.current.toastType).toBe(ToastTypes.error);
  });

  test('should hide toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToastOptions('Test message', ToastTypes.success);
    });

    expect(result.current.toastVisible).toBe(true);

    act(() => {
      result.current.closeToast();
    });

    expect(result.current.toastVisible).toBe(false);
  });

  test('should set toast options without showing', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToastOptions('Test message', ToastTypes.success, false);
    });

    expect(result.current.toastVisible).toBe(false);
    expect(result.current.toastMsg).toBe('Test message');
    expect(result.current.toastType).toBe(ToastTypes.success);
  });
});
