import { FC, useState, useCallback } from 'react';
import { ButtonProps } from './Button.types';
import { Button } from './Button';

export const ButtonAnimated: FC<ButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback(() => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    setIsAnimating(true);

    // Wait for the animation to complete before executing the onClick action
    setTimeout(() => {
      onClick?.();
      // Reset animation state after navigation
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 300); // This matches our total animation duration (0.5s expand + 0.5s fade)
  }, [onClick, isAnimating]);

  return (
    <Button onClick={handleClick} {...props}>
      {children}
      <div className={`overlay-button ${isAnimating ? 'animate' : ''}`}></div>
    </Button>
  );
};
