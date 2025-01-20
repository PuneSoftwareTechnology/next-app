// src/components/Typography.tsx
import React from "react";

type TypographyProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  role?: string;
  rest?: React.HTMLProps<HTMLElement>; // Accept any other HTML props
};

const baseStyles: Record<string, string> = {
  h1: "text-4xl font-bold text-gray-900",
  h2: "text-3xl font-semibold text-gray-800",
  h3: "text-2xl font-semibold text-gray-700",
  h4: "text-xl font-medium text-gray-700",
  h5: "text-lg font-medium text-gray-600",
  h6: "text-base font-medium text-gray-600",
  p: "text-base text-gray-700",
  span: "text-sm text-gray-600",
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  className,
  children,
  as,
  role,
  ...rest
}) => {
  const Component = as || variant;
  const combinedClassName = `${baseStyles[variant]} ${className || ""}`;

  return (
    <Component className={combinedClassName} role={role} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;
