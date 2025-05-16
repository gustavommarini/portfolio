import { renderHook } from '@testing-library/react';
import '@/test-utils/envMock';
import { advanceTimersByNTimes } from '@/test-utils';
import { useTypewriter } from './useTypewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should start with first word', () => {
    const words = 'First';
    const { result } = renderHook(() => useTypewriter(words));
    // Move to the end of the word
    advanceTimersByNTimes(words.length);
    expect(result.current).toBe('First');
  });

  test('should cycle through words', () => {
    const words = ['First', 'Second', 'Third'];
    const { result } = renderHook(() => useTypewriter(words));
    advanceTimersByNTimes(words[0].length);
    // First word
    expect(result.current).toBe('First');
    // Move to second word
    advanceTimersByNTimes(words[1].length + 1);
    expect(result.current).toBe(' Second');
    // Move to third word
    advanceTimersByNTimes(words[2].length + 1);
    expect(result.current).toBe(' Third');
    // Should cycle back to first word
    advanceTimersByNTimes(words[0].length + 1);
    expect(result.current).toBe(' First');
  });

  test('should handle empty array', () => {
    const { result } = renderHook(() => useTypewriter([]));
    expect(result.current).toBe(' ');
  });

  test('should handle single word', () => {
    const words = ['Single'];
    const { result } = renderHook(() => useTypewriter(words));
    advanceTimersByNTimes(words[0].length);
    expect(result.current).toBe('Single');
  });
});
