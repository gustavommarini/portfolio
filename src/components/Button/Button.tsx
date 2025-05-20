import { FC } from 'react';
import { ButtonProps, ButtonSize, ButtonType } from './Button.types';
import './button.scss';

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  type = ButtonType.primary,
  size = ButtonSize.md,
  isForSubmition = false,
  disabled = false,
  fullSizeOnMobile = false,
}) => {
  return (
    <button
      className={`btn ${type} ${size}${fullSizeOnMobile ? ' btn-full-mobile' : ''}`}
      type={isForSubmition ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="btn-children">{children}</div>
    </button>
  );
};
