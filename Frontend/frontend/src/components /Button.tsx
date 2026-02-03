// Button.tsx
// Reusable Button component with loading & disabled support

interface ButtonProps {
  size: "lg" | "md" | "sm";
  variant: "primary" | "secondary";
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

// Button color variants
const variantStyles = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-blue-200 text-blue-700",
};

// Button size variants
const sizeStyles = {
  lg: "m-3 py-3 px-6 rounded-xl",
  md: "m-3 py-2 px-6 rounded-xl",
  sm: "m-3 py-2 px-4 rounded-xl",
};

// Base styles (no cursor here — handled conditionally)
const baseStyles = "flex items-center justify-center gap-2 transition-all";

export const Button = (props: ButtonProps) => {
  const isDisabled = props.loading || props.disabled;

  return (
    <button
      // Prevent click when disabled or loading
      onClick={!isDisabled ? props.onClick : undefined}
      disabled={isDisabled}
      className={`
        ${variantStyles[props.variant]}
        ${sizeStyles[props.size]}
        ${baseStyles}
        ${
          isDisabled
            ? "cursor-not-allowed opacity-50 pointer-events-none"
            : "cursor-pointer hover:opacity-90"
        }
      `}
    >
      {/* Optional left icon */}
      {props.startIcon}

      {/* Button text */}
      <span>{props.loading ? "Loading..." : props.text}</span>

      {/* Optional right icon */}
      {props.endIcon}
    </button>
  );
};