import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.css';
function Header({ children, ...props }: HeaderProps) {
  return (
    <div
      {...props}
      className={cn(styles['header'])}
    >
      {children}
    </div>
  );
}
export default Header;
