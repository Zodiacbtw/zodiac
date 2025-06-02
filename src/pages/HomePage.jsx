import React from 'react';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const featuredProductsData = [
  {
    id: 'hp_prod1',
    tag: 'NEW',
    tagColor: 'bg-red-500 text-white',
    title: 'Premium T-Shirt',
    price: '$29.99',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productUrl: '/product/premium-t-shirt'
  },
  {
    id: 'hp_prod2',
    title: 'Elegant Watch',
    price: '$199.99',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productUrl: '/product/elegant-watch'
  },
  {
    id: 'hp_prod3',
    tag: 'SALE',
    tagColor: 'bg-green-500 text-white',
    title: 'Wireless Headphones',
    price: '$79.99',
    oldPrice: '$99.99',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productUrl: '/product/wireless-headphones'
  },
];

const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const HomePage = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(state => state.category);

  const topCategories = [...categories]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  return (
    <div className="flex flex-col space-y-10 md:space-y-16">
      <section>
        <Slider />
      </section>

      <section>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Check out some of our best-selling items.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 sm:gap-x-6 sm:gap-y-8">
          {featuredProductsData.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              tag={product.tag}
              tagColor={product.tagColor}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              productUrl={product.productUrl}
            />
          ))}
        </div>
      </section>

      {(!categoriesLoading && topCategories.length > 0) && (
        <section>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Top Categories</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Explore our most popular categories.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {topCategories.map(category => (
              <Link
                key={category.id}
                to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${slugify(category.title)}/${category.id}`}
                className="group flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all mb-3">
                  <img 
                    src={category.img}
                    alt={category.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150.png?text=No+Image" }}
                  />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
      {categoriesLoading && <div className="text-center py-8">Loading categories...</div>}
      {categoriesError && <div className="text-center py-8 text-red-500">Error loading categories: {categoriesError}</div>}

      <section className="bg-pink-50 p-6 md:p-10 lg:p-12 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-12">
          <div className="md:w-1/2 lg:w-[45%] xl:w-2/5 rounded-md overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0eWxpc2glMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Stylish Outfit Combination"
              className="w-full h-72 md:h-80 lg:h-96 object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2 lg:w-[55%] xl:w-3/5 text-center md:text-left">
            <p className="text-xs font-semibold uppercase text-pink-600 mb-2 tracking-wider">STYLE GUIDE</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
              Unlock Your Signature Look
            </h2>
            <p className="text-gray-700 text-sm md:text-base mb-6 lg:mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              Discover curated outfits and styling tips to express your unique personality. From casual chic to evening elegance, find inspiration for every occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                 <a
                    href="/blog/style-guides"
                    className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-7 rounded text-sm sm:text-base transition-colors shadow-md hover:shadow-lg"
                 >
                    Explore Styles
                </a>
                <a
                    href="/shop/new-arrivals"
                    className="inline-block border border-pink-500 text-pink-600 hover:bg-pink-100 font-semibold py-3 px-7 rounded text-sm sm:text-base transition-colors"
                >
                    Shop New In
                </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;