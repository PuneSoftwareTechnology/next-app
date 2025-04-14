// src/components/Typography.tsx
import Linkify from "linkify-react";
import React from "react";

type TypographyProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  role?: string;
  id?: string; // Add id for SEO-friendly headings
  rest?: React.HTMLProps<HTMLElement>; // Accept any other HTML props
};

const baseStyles: Record<string, string> = {
  h1: "text-3xl md:text-4xl font-bold text-gray-900",
  h2: "text-2xl md:text-3xl font-semibold text-gray-800",
  h3: "text-xl md:text-2xl font-semibold text-gray-700",
  h4: "text-lg md:text-xl font-medium text-gray-700",
  h5: "text-base md:text-lg font-medium text-gray-600",
  h6: "text-sm md:text-base font-medium text-gray-600",
  p: "text-sm md:text-base text-gray-700",
  span: "text-sm text-gray-600",
};

// Utility function to replace *text* with <strong>text</strong> and \n with <br />
const formatText = (text: string): React.ReactNode => {
  // Split text by *text* patterns and newlines
  const parts = text.split(/(\*[^*]+\*|\n)/g);

  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      // Remove the * and wrap the text in <strong>
      return <strong key={index}>{part.slice(1, -1)}</strong>;
    } else if (part === "\n") {
      // Replace newline with <br />
      return <br key={index} />;
    }
    return part;
  });
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  className,
  children,
  as,
  role,
  id, // Destructure id
  ...rest
}) => {
  const Component = as || variant;
  const combinedClassName = `${baseStyles[variant]} ${className || ""}`;

  // Format the children to handle *text* for bold and \n for newlines
  const formattedChildren =
    typeof children === "string" ? formatText(children) : children;

  return (
    <Component className={combinedClassName} role={role} id={id} {...rest}>
      <Linkify
        options={{
          target: "_blank",
          className: "text-blue-700 font-bold underline",
        }}
      >
        {formattedChildren}
      </Linkify>
    </Component>
  );
};

export default Typography;
