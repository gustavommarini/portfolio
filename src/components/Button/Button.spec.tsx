import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { Button } from './Button';
import { ButtonSize, ButtonType } from './Button.types';
import { ButtonAnimated } from './ButtonAnimated';

// Mock timers for animation delays
jest.useFakeTimers();

describe('Button Components', () => {
  describe('Button', () => {
    test('renders with default props', () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('btn', ButtonType.primary, ButtonSize.md);
      expect(button).not.toBeDisabled();
    });

    test('renders with custom type and size', () => {
      render(
        <Button type={ButtonType.outlined} size={ButtonSize.sm}>
          Custom Button
        </Button>
      );
      const button = screen.getByRole('button', { name: /custom button/i });
      expect(button).toHaveClass('btn', ButtonType.outlined, ButtonSize.sm);
    });

    test('handles click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button', { name: /click me/i });
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders as submit button', () => {
      render(<Button isForSubmition>Submit</Button>);

      const button = screen.getByRole('button', { name: /submit/i });
      expect(button).toHaveAttribute('type', 'submit');
    });

    test('renders as disabled button', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
    });

    test('renders children with correct class', () => {
      render(<Button>Button Text</Button>);

      const buttonText = screen.getByText('Button Text');
      expect(buttonText).toHaveClass('btn-children');
    });
  });
  describe('ButtonAnimated', () => {
    beforeEach(() => {
      jest.clearAllTimers();
    });

    test('renders with children and overlay element', () => {
      render(<ButtonAnimated>Animated Button</ButtonAnimated>);
      expect(screen.getByText('Animated Button')).toBeInTheDocument();
      expect(
        screen
          .getByText('Animated Button')
          .closest('.btn')
          ?.querySelector('.overlay-button')
      ).toBeInTheDocument();
    });

    test('adds animate class on click and removes it after animation', async () => {
      render(<ButtonAnimated>Animated Button</ButtonAnimated>);
      const button = screen.getByText('Animated Button');
      const overlay = button
        .closest('.btn')
        ?.querySelector('.overlay-button') as HTMLElement;

      // Initial state
      expect(overlay).not.toHaveClass('animate');

      // Click the button
      await act(async () => {
        fireEvent.click(button);
      });
      expect(overlay).toHaveClass('animate');

      // Advance timers and check if animation class is removed
      await act(async () => {
        jest.advanceTimersByTime(400); // 300ms for animation + 100ms for cleanup
      });
      await waitFor(() => {
        expect(overlay).not.toHaveClass('animate');
      });
    });

    test('delays onClick callback until animation completes', async () => {
      const handleClick = jest.fn();
      render(
        <ButtonAnimated onClick={handleClick}>Animated Button</ButtonAnimated>
      );

      // Click the button
      await act(async () => {
        fireEvent.click(screen.getByText('Animated Button'));
      });

      // Verify callback hasn't been called immediately
      expect(handleClick).not.toHaveBeenCalled();

      // Advance timers to animation completion
      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      // Verify callback is called after animation
      await waitFor(() => {
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    test('prevents multiple clicks during animation', async () => {
      const handleClick = jest.fn();
      render(
        <ButtonAnimated onClick={handleClick}>Animated Button</ButtonAnimated>
      );

      // First click
      await act(async () => {
        fireEvent.click(screen.getByText('Animated Button'));
      });

      // Second click during animation
      await act(async () => {
        jest.advanceTimersByTime(100);
      });
      await act(async () => {
        fireEvent.click(screen.getByText('Animated Button'));
      });

      // Advance to animation completion
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Verify callback is called only once
      await waitFor(() => {
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    test('applies button type props correctly', () => {
      render(
        <ButtonAnimated type={ButtonType.outlined}>
          Outlined Animated Button
        </ButtonAnimated>
      );
      expect(
        screen.getByText('Outlined Animated Button').closest('.btn')
      ).toHaveClass('btn-outlined');
    });
  });
});
