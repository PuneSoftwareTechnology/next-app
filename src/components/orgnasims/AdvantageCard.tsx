import React, { ReactElement } from "react";
import Typography from "../atoms/Typography";

interface CardProps {
  title: string;
  description: string;
  icon: ReactElement;
}

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
      role="article"
      aria-labelledby={`card-title-${title.replace(/\s+/g, "-")}`}
      aria-describedby={`card-desc-${title.replace(/\s+/g, "-")}`}
    >
      <span className="mb-4" aria-hidden="true">
        {icon}
      </span>
      <Typography variant="h5" className="mb-2 text-gray-900" as="h3">
        {title}
      </Typography>
      <Typography variant="p" className="text-gray-600">
        {description}
      </Typography>
    </div>
  );
};

export default Card;
