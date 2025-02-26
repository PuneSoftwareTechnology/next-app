import React, { ReactElement } from "react";
import Typography from "../atoms/Typography";

interface CardProps {
  title: string;
  description: string;
  icon: ReactElement;
}

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  const titleId = `card-title-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const descId = `card-desc-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article
      className="bg-white shadow-lg border-2 rounded-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
      role="article"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      {/* SEO metadata using JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: title,
          description: description,
        })}
      </script>

      <span className="mb-4" aria-hidden="true">
        {icon}
      </span>
      <Typography
        variant="h5"
        className="mb-2 text-gray-900"
        as="h3"
        key={titleId}
      >
        {title}
      </Typography>
      <Typography variant="p" className="text-gray-600" key={descId}>
        {description}
      </Typography>
    </article>
  );
};

export default Card;
