import React, { FC } from 'react';
import { ButtonProps, ButtonSize, ButtonType } from './button.types';
import './button.scss';

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  type = ButtonType.primary,
  size = ButtonSize.md,
}) => {
  return (
    <button className={`btn ${type} ${size}`} onClick={onClick}>
      <div className="btn-children fjalla-one-regular">{children}</div>
    </button>
  );
};
