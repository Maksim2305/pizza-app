import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  appearence?: 'big' | 'small' | 'icon' | 'default';
  transparent?: boolean;
}
