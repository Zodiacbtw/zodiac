import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({
  id,
  imageUrl,
  imageAlt,
  tag,
  tagColor,
  title,
  price,
  oldPrice,
  className = ""
}) => {
  const productLink = `/product/${id}`;

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group ${className} h-full transition-all duration-300 hover:shadow-xl`}>
      <div className="relative">
        <Link to={productLink} className="block aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4]">
          <img
            src={imageUrl || 'https://via.placeholder.com/400x500.png?text=No+Image'}
            alt={imageAlt || title || "Product Image"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {tag && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md shadow ${tagColor || 'bg-red-500 text-white'}`}>
            {tag.toUpperCase()}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 mb-1.5 h-10 leading-5 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link to={productLink}>{title}</Link>
        </h3>

        <div className="flex items-baseline gap-2 mb-3 mt-auto pt-2">
          {price !== undefined && price !== null && (
            <p className="text-lg font-bold text-gray-900">
              ${typeof price === 'number' ? price.toFixed(2) : price}
            </p>
          )}
          {oldPrice !== undefined && oldPrice !== null && (
            <p className="text-sm text-red-500 line-through">
              ${typeof oldPrice === 'number' ? oldPrice.toFixed(2) : oldPrice}
            </p>
          )}
        </div>

        <Link
          to={productLink}
          className="w-full mt-2 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-md text-xs sm:text-sm transition-colors"
        >
          View Details <ArrowRight size={14} className="inline ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;