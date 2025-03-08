import React from "react";
import Loader from "./Loader";

interface PrimaryButtonProps {
  type: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  stretch?: boolean;
  rest?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  ariaLabel?: string;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type,
  onClick,
  disabled = false,
  loading = false,
  children,
  stretch = false,
  rest,
  ariaLabel = "button",
  className,
}) => {
  const isButtonDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isButtonDisabled}
      aria-label={ariaLabel}
      className={`w-fit py-2 px-4 rounded-md text-white ${
        stretch ? "w-full" : "sm:w-fit"
      } ${
        isButtonDisabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 "
      } ${className}`}
      {...rest}
    >
      <div className="flex justify-center items-center gap-x-2 font-semibold">
        {loading && (
          <div className="flex justify-center items-center">
            <Loader size="small" ariaLabel="Submitting..." />
          </div>
        )}
        {children}
      </div>
    </button>
  );
};

export default PrimaryButton;
