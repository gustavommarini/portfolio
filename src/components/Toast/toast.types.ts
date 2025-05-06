export interface ToastProps {
  children: React.ReactNode;
  onClose: () => void;
  show?: boolean;
  type?: ToastTypes;
}

export enum ToastTypes {
  error = 'error',
  success = 'success',
  info = 'info',
}
