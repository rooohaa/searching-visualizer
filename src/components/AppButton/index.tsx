import React, { ButtonHTMLAttributes } from 'react';
import { ButtonWrapper } from './style';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant: 'primary' | 'secondary';
}

const AppButton: React.FC<AppButtonProps> = ({
  children,
  variant,
  onClick,
  disabled,
}) => {
  return (
    <ButtonWrapper onClick={onClick} variant={variant} disabled={disabled}>
      {children}
    </ButtonWrapper>
  );
};

export { AppButton };
