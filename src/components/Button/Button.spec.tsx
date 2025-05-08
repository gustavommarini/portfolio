import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { ButtonSize, ButtonType } from './Button.types';

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
