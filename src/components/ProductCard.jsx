import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const slugify = (text) => {
  if (!text) return '';

  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return text.toString().toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/\s+/g, '-')
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
};

const genderToUrlKey = (genderApiValue) => (genderApiValue === 'k' ? 'women' : genderApiValue === 'e' ? 'men' : 'unisex');

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const { categories } = useSelector(state => state.category);
  const category = categories.find(cat => cat.id === product.category_id);

  if (!category) {
    return null;
  }

  const gender = genderToUrlKey(category.gender);
  const categoryName = slugify(category.title); 
  const productNameSlug = slugify(product.name);
  const productDetailUrl = `/shop/${gender}/${categoryName}/${category.id}/${productNameSlug}/${product.id}`;

  return (
    <Link to={productDetailUrl} className="group block">
      <div className="border rounded-lg p-4 transition-all duration-300 ease-in-out 
                      cursor-pointer group-hover:shadow-xl group-hover:scale-105 h-full flex flex-col">
        <div className="relative w-full h-72 mb-4">
            <img
            src={product.images?.[0]?.url || 'https://via.placeholder.com/300x400'}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
            />
        </div>
        <div className="flex-grow flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 truncate flex-grow">{product.name}</h3>
            <p className="text-xl font-bold text-blue-600 mt-2">{product.price.toFixed(2)} ₺</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;