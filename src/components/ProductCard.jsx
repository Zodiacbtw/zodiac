import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({
  imageUrl,
  imageAlt = "Product Image",
  tag,
  tagColor = "bg-red-500 text-white",
  title,
  price,
  oldPrice,
  productUrl = "#",
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col group ${className}`}>
      <div className="relative">
        <a href={productUrl} className="block">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:opacity-90 transition-opacity duration-300"
          />
        </a>
        {tag && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded ${tagColor}`}>
            {tag}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate group-hover:text-blue-600 transition-colors">
          <a href={productUrl}>{title}</a>
        </h3>

        <div className="flex items-baseline gap-2 mb-3">
          {price && (
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              {price}
            </p>
          )}
          {oldPrice && (
            <p className="text-sm text-red-500 line-through">
              {oldPrice}
            </p>
          )}
        </div>

        <a
          href={productUrl}
          className="mt-auto inline-flex items-center justify-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
        >
          View Details
          <ArrowRight size={16} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
};

export default ProductCard;