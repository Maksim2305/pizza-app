import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';
import { InputProps } from './Input.props';
const Input = forwardRef<HTMLInputElement, InputProps>(function Input({className, isValid=true, ...props}, ref) {
  return (
    <input
    ref={ref}
    {...props}
      className={cn(styles['input'], {
        [styles['invalid']]: !isValid, className
      })}
    />
  );
});
export default Input;