import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';
import { InputProps } from './Input.props';
const Input = forwardRef<HTMLInputElement, InputProps>(function Input({className, placeholder, search = true, ...props}, ref) {
  return (
    <div style={{position: 'relative'}}>
      <input
      placeholder={placeholder}
      ref={ref}
      {...props}
        className={cn(styles['input'])}
      />
      {search && <img src="/search.svg" alt="search" className={cn(styles['icon'])} />}
    </div>
  );
});
export default Input;