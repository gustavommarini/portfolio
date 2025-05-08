import { act } from '@testing-library/react';

// So we can wait setTimeout loops
export const advanceTimersByNTimes = (n = 1, time = 180) => {
  for (let i = 0; i < n; i++) {
    act(() => {
      jest.advanceTimersByTime(time * 1);
    });
  }
};
