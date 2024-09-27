import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';
function Button({
  children,
  className,
  appearence = 'small',
  transparent = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        styles[transparent ? 'transparent' : 'button'],
        [styles[appearence]],
        className
      )}
    >
      {children}
    </button>
  );
}
export default Button;
