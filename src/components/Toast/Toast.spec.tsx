import { render, screen, act } from '@testing-library/react';
import { Toast } from './Toast';
import { ToastTypes } from './toast.types';

describe('Toast', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    mockOnClose.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const renderToast = (props = {}) => {
    return render(
      <Toast
        show={true}
        onClose={mockOnClose}
        type={ToastTypes.info}
        {...props}
      >
        Test Message
      </Toast>
    );
  };

  test('renders toast message', () => {
    renderToast();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  test('applies correct type class', () => {
    renderToast({ type: ToastTypes.success });
    expect(screen.getByTestId('toast-message')).toHaveClass('toast-success');
  });

  test('shows and hides based on show prop', () => {
    const { rerender } = renderToast({ show: false });
    expect(screen.getByTestId('toast-message')).not.toHaveClass('show');

    rerender(
      <Toast show={true} onClose={mockOnClose} type={ToastTypes.info}>
        Test Message
      </Toast>
    );
    expect(screen.getByTestId('toast-message')).toHaveClass('show');
  });

  test('renders correct icon based on type', () => {
    const { rerender } = renderToast({ type: ToastTypes.info });
    // Test info type
    let icon = screen.getByRole('icon');
    expect(icon).toHaveClass('fa-regular', 'fa-circle-question');

    // Test error type
    rerender(
      <Toast show={true} onClose={mockOnClose} type={ToastTypes.error}>
        Test Message
      </Toast>
    );
    icon = screen.getByRole('icon');
    expect(icon).toHaveClass('fa-regular', 'fa-circle-xmark');

    // Test success type
    rerender(
      <Toast show={true} onClose={mockOnClose} type={ToastTypes.success}>
        Test Message
      </Toast>
    );
    icon = screen.getByRole('icon');
    expect(icon).toHaveClass('fa-regular', 'fa-circle-check');
  });

  test('auto-closes after 5 seconds', () => {
    renderToast();

    // Fast-forward 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('cleans up timer on unmount', () => {
    const { unmount } = renderToast();

    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    unmount();

    // Fast-forward remaining time
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('resets timer when show prop changes', () => {
    const { rerender } = renderToast();

    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Hide toast
    rerender(
      <Toast show={false} onClose={mockOnClose} type={ToastTypes.info}>
        Test Message
      </Toast>
    );

    // Show toast again
    rerender(
      <Toast show={true} onClose={mockOnClose} type={ToastTypes.info}>
        Test Message
      </Toast>
    );

    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockOnClose).not.toHaveBeenCalled();

    // Fast-forward remaining time
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
