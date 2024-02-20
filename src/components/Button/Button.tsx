import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';
function Button({ children, className, appearence = 'small', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(styles['button'],{
        [styles['small']]: appearence ==='small',
        [styles['big']]: appearence ==='big'
      }, className)}
    >
      {children}
    </button>
  );
}
export default Button;
