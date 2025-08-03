import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const color = {
  purple: {
    300: "#e0e7fe",
    500: "#3e38a7",
    600: "#5046e4",
  },
};

const variantStyle: Record<"primary" | "secondary", string> = {
  primary: "text-white",
  secondary: "text-current",
};

const defaultStyles = "rounded-md flex items-center gap-2";

const sizeStyle: Record<"sm" | "md" | "lg", string> = {
  sm: "py-2 px-3 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-5 text-lg",
};

export const Button = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) => {
  const backgroundColor =
    variant === "primary" ? color.purple[600] : color.purple[300];

  const textColor = variant === "secondary" ? color.purple[600] : "#fff";

  return (
    <div className="flex py-2">
      <button
        onClick={onClick}
        className={`${variantStyle[variant]} ${defaultStyles} ${sizeStyle[size]}`}
        style={{ backgroundColor, color: textColor }}
      >
        {startIcon && <span>{startIcon}</span>}
        <span>{text}</span>
        {endIcon && <span>{endIcon}</span>}
      </button>
    </div>
  );
};
