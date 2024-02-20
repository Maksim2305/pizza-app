import { ButtonProps } from "../Button.props";
import cn from "classnames";
import styles from "./Button.module.css";
function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(styles["button"], className)}
    >
      {children}
    </button>
  );
}
export default Button;
