import { FC, useEffect } from 'react';
import { ToastProps, ToastTypes } from './toast.types';
import './toast.scss';

export const Toast: FC<ToastProps> = ({
  children,
  type = ToastTypes.info,
  show = false,
  onClose,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const iconHelper: Record<ToastTypes, string> = {
    [ToastTypes.info]: 'question',
    [ToastTypes.error]: 'xmark',
    [ToastTypes.success]: 'check',
  };
  return (
    <div
      id="toast-message"
      data-testid="toast-message"
      className={`toast-${type}${show ? ' show' : ''}`}
    >
      <div className="body-message">
        <i
          role="icon"
          className={`fa-regular fa-circle-${iconHelper[type]}`}
        ></i>
        <p>{children}</p>
      </div>
    </div>
  );
};
