import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({
  accentText,
  title,
  description,
  linkText,
  linkHref = "#",
  bgColor = 'bg-zinc-800',
  textColor = 'text-white',
  accentColor = 'text-gray-400',
  linkColor = 'text-white hover:underline',
  className = ""
}) => {
  return (
    <div className={`p-6 md:p-8 rounded-lg shadow-lg flex flex-col ${bgColor} ${className}`}>
      {accentText && (
        <span className={`text-xs font-semibold uppercase ${accentColor} mb-1.5`}>
          {accentText}
        </span>
      )}
      <h3 className={`text-2xl lg:text-3xl font-bold mb-2 ${textColor}`}>
        {title}
      </h3>
      <p className={`text-sm mb-5 flex-grow ${textColor} opacity-80`}>
        {description}
      </p>
      {linkText && (
        <a
          href={linkHref}
          className={`mt-auto text-sm font-medium flex items-center gap-1.5 ${linkColor} transition-opacity`}
        >
          {linkText}
          <ArrowRight size={16} />
        </a>
      )}
    </div>
  );
};

export default ProductCard;