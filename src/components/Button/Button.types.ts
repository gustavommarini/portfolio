export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  isForSubmition?: boolean;
}

export enum ButtonSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export enum ButtonType {
  primary = 'btn-primary',
  secundary = 'btn-secundary',
  outlined = 'btn-outlined',
}
