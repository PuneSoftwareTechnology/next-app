import React from "react";

interface LoaderProps extends Record<string, unknown> {
  size?: "small" | "medium" | "large";
  ariaLabel?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "small",
  ariaLabel = "Loading...",
  className = "",
  ...rest
}) => {
  const sizeClassNames = {
    small: "w-6 h-6 border-2",
    medium: "w-12 h-12 border-4",
    large: "w-16 h-16 border-8",
  };

  return (
    <div
      role="status"
      aria-live="assertive"
      className={`border-t-transparent border-white-100 border-solid animate-spin rounded-full ${sizeClassNames[size]} ${className}`}
      aria-label={ariaLabel}
      {...rest}
    >
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
};

export default Loader;
