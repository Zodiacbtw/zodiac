import React from 'react';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';

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

const HomePage = () => {
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

      <section className="bg-pink-50 p-6 md:p-10 lg:p-12 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-12">
          <div className="md:w-1/2 lg:w-[45%] xl:w-2/5 rounded-md overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0eWxpc2glMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80" // Yeni moda/stil görseli
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