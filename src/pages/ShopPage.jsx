import React from 'react';
import ProductCard from '../components/ProductCard';

const sampleProducts = [
  {
    id: 'prod1',
    tag: 'NEW',
    tagColor: 'bg-red-500 text-white',
    title: 'Premium T-Shirt',
    price: '$29.99',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productUrl: '/product/premium-t-shirt'
  },
  {
    id: 'prod2',
    title: 'Elegant Watch',
    price: '$199.99',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productUrl: '/product/elegant-watch'
  },
  {
    id: 'prod3',
    tag: 'SALE',
    tagColor: 'bg-green-500 text-white',
    title: 'Wireless Headphones',
    price: '$79.99',
    oldPrice: '$99.99',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productUrl: '/product/wireless-headphones'
  },
  {
    id: 'prod4',
    title: 'Leather Backpack',
    price: '$120.00',
    imageUrl: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    productUrl: '/product/leather-backpack'
  },
];


const ShopPage = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Shop Our Products</h1>
        <p className="text-gray-600 mt-2">Discover a wide range of high-quality items.</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="md:w-1/3 lg:w-1/4">
          <button className="md:hidden w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded flex items-center justify-center gap-2 border border-gray-300">
            <span>Filters</span>
          </button>
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Filters</h2>
            <div className="text-sm text-gray-500 space-y-1">
                <p>Category Filters (Placeholder)</p>
                <p>Price Range (Placeholder)</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3">
          <span className="text-sm text-gray-600">Showing {sampleProducts.length} products</span>
          <select className="text-sm border border-gray-300 rounded py-2 px-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option>Sort by relevance</option>
            <option>Sort by price: low to high</option>
          </select>
        </div>
      </div>

      <div className="flex flex-row gap-x-6 lg:gap-x-8">
        <aside className="hidden md:block md:w-1/3 lg:w-1/4 xl:w-1/5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
          <ul className="space-y-1.5 text-sm">
            <li><a href="#" className="text-gray-600 hover:text-blue-600">T-Shirts</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600">Watches</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600">Headphones</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600">Backpacks</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600">Accessories</a></li>
          </ul>
        </aside>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 sm:gap-x-6 sm:gap-y-8">
          {sampleProducts.map((product) => (
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
      </div>
      
      <div className="mt-10 md:mt-12 flex justify-center">
        <nav className="flex rounded-md " aria-label="Pagination">
          <a href="#" className="relative inline-flex items-center px-3 py-1.5 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            Previous
          </a>
          <a href="#" aria-current="page" className="relative z-10 inline-flex items-center px-3 py-1.5 border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600">1</a>
          <a href="#" className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">2</a>
          <a href="#" className="hidden sm:inline-flex relative items-center px-3 py-1.5 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</a>
          <span className="hidden sm:inline-flex relative items-center px-3 py-1.5 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>
          <a href="#" className="hidden sm:inline-flex relative items-center px-3 py-1.5 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">8</a>
          <a href="#" className="relative inline-flex items-center px-3 py-1.5 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            Next
          </a>
        </nav>
      </div>
    </div>
  );
};

export default ShopPage;