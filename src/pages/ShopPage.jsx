import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';

const allSampleProducts = [
  { id: 'sprod1', productIdForUrl: 'premium-t-shirt', categoryIds: [1, 14], title: 'Premium T-Shirt', tag: 'NEW', price: '$29.99', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', productUrl: '/product/premium-t-shirt'},
  { id: 'sprod2', productIdForUrl: 'elegant-watch', categoryIds: [2, 9], title: 'Elegant Watch', price: '$199.99', oldPrice: '$249.99', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', productUrl: '/product/elegant-watch'},
  { id: 'sprod3', productIdForUrl: 'wireless-headphones', categoryIds: [], title: 'Wireless Headphones', tag: 'SALE', price: '$79.99', oldPrice: '$99.99', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', productUrl: '/product/wireless-headphones'},
  { id: 'sprod4', productIdForUrl: 'leather-backpack', categoryIds: [], title: 'Leather Backpack', price: '$120.00', imageUrl: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', productUrl: '/product/leather-backpack'},
  { id: 'sprod5', productIdForUrl: 'erkek-gomlek', categoryIds: [11], title: 'Erkek Klasik Gömlek', price: '$45.00', imageUrl: 'https://images.unsplash.com/photo-1603252109360-7098af9a3a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', productUrl: '/product/erkek-klasik-gomlek'},
  { id: 'sprod6', productIdForUrl: 'kadin-elbise', categoryIds: [4], title: 'Kadın Yazlık Elbise', price: '$65.00', imageUrl: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', productUrl: '/product/kadin-yazlik-elbise'},

];

const ShopPage = () => {
  const { gender, categoryName, categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(allSampleProducts);
  const [pageTitle, setPageTitle] = useState('Shop Our Products');

  const { categories } = useSelector(state => state.category);

  useEffect(() => {
    let productsToDisplay = allSampleProducts;
    let titleForPage = 'Shop Our Products';

    if (categoryId && categories.length > 0) {
      const numericCategoryId = parseInt(categoryId, 10);
      productsToDisplay = allSampleProducts.filter(product => 
        product.categoryIds && product.categoryIds.includes(numericCategoryId)
      );
      
      const currentCategory = categories.find(cat => cat.id === numericCategoryId);
      if (currentCategory) {
        const genderText = currentCategory.gender === 'k' ? 'Kadın' : currentCategory.gender === 'e' ? 'Erkek' : '';
        titleForPage = `${genderText} ${currentCategory.title} Ürünleri`;
      } else {
        titleForPage = "Category Products";
      }

    } else if (gender) {
        const apiGender = gender === 'kadin' ? 'k' : gender === 'erkek' ? 'e' : null;
        if (apiGender) {
            titleForPage = `${gender.charAt(0).toUpperCase() + gender.slice(1)} Ürünleri`;
        }
    }
    setFilteredProducts(productsToDisplay);
    setPageTitle(titleForPage);

  }, [categoryId, gender, categoryName, categories]);

  return (
    <div className="flex flex-col">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {pageTitle}
        </h1>
        {(!categoryId && !gender) && <p className="text-gray-600 mt-2">Discover a wide range of high-quality items.</p>}
      </div>

      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      </div>

      <div className="flex flex-row gap-x-6 lg:gap-x-8">
        <aside className="hidden md:block md:w-1/3 lg:w-1/4 xl:w-1/5">
        </aside>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 sm:gap-x-6 sm:gap-y-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">
                No products found for this selection.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;