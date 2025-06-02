import React, { useEffect } from 'react';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import { Loader2 } from 'lucide-react';

const categoryTitleToEnglishMap = {
  'Tişört': 'T-shirt', 'Ayakkabı': 'Shoes', 'Ceket': 'Jackets', 'Elbise': 'Dresses',
  'Etek': 'Skirts', 'Gömlek': 'Shirts', 'Kazak': 'Sweaters', 'Pantolon': 'Pants', 'Pantalon': 'Pants',
};
const displayCategoryTitleInEnglish = (turkishTitle) => {
  if (!turkishTitle) return 'Category';
  const correctedTitle = (turkishTitle.toLowerCase() === 'pantalon') ? 'Pantolon' : turkishTitle;
  return categoryTitleToEnglishMap[correctedTitle] || correctedTitle;
};
const slugifyCategoryTitle = (title) => {
  if (!title) return 'category';
  let titleToSlug = title;
  if (title.toLowerCase() === 'pantalon') titleToSlug = 'Pantolon';
  const englishTitle = categoryTitleToEnglishMap[titleToSlug] || titleToSlug;
  return englishTitle.toLowerCase().replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};
const genderToUrlKey = (genderApiValue) => (genderApiValue === 'k' ? 'women' : genderApiValue === 'e' ? 'men' : 'unisex');


const HomePage = () => {
  const dispatch = useDispatch();
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(state => state.category);
  const { 
    productList: allProducts,
    loading: productsLoading, 
    error: productsErrorMsg
  } = useSelector(state => state.product);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
        dispatch(fetchProducts({ limit: 25 }));
    }
  }, [dispatch, allProducts]);


  let uniqueTopCategories = [];
  if (categories && categories.length > 0) {
    const sortedCategories = [...categories].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    const seenTitles = new Set();
    for (const category of sortedCategories) {
      const englishTitle = displayCategoryTitleInEnglish(category.title);
      if (!seenTitles.has(englishTitle)) {
        uniqueTopCategories.push(category);
        seenTitles.add(englishTitle);
      }
      if (uniqueTopCategories.length >= 5) break;
    }
  }

  let featuredProducts = [];
  if (allProducts && allProducts.length > 0) {
    const featuredProductIds = [10, 12, 11];

    featuredProducts = allProducts.filter(product => featuredProductIds.includes(product.id));

    const blackTshirt = allProducts.find(p => p.id === 13 || (p.name.toLowerCase().includes("minimal kalp baskılı siyah") && p.price === 59));
    const redTshirt = allProducts.find(p => p.id === 11 || (p.name.toLowerCase().includes("minimal kalp baskılı") && p.images[0].url.includes("3d7bac93")));
    const whiteTshirt = allProducts.find(p => p.id === 12 || (p.name.toLowerCase().includes("minimal kalp baskılı beyaz") && p.price === 69));
    
    featuredProducts = [];
    if (blackTshirt) featuredProducts.push(blackTshirt);
    if (redTshirt) featuredProducts.push(redTshirt);
    if (whiteTshirt) featuredProducts.push(whiteTshirt);

    if (featuredProducts.length < 3 && allProducts.length > featuredProducts.length) {
        const remainingNeeded = 3 - featuredProducts.length;
        const existingIds = new Set(featuredProducts.map(p => p.id));
        const additionalProducts = allProducts.filter(p => !existingIds.has(p.id)).slice(0, remainingNeeded);
        featuredProducts = [...featuredProducts, ...additionalProducts];
    }

  }


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
        {productsLoading && featuredProducts.length === 0 ? (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
            </div>
        ) : productsErrorMsg && featuredProducts.length === 0 ? (
            <p className="text-center text-red-500">Could not load featured products: {productsErrorMsg}</p>
        ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 sm:gap-x-6">
            {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  imageUrl={product.images && product.images.length > 0 ? product.images[0].url : undefined}
                  imageAlt={product.name}
                  title={product.name}
                  price={product.price}
                />
            ))}
            </div>
        ) : (
            !productsLoading && <p className="text-center text-gray-500">No featured products available at the moment.</p>
        )}
      </section>

      {(!categoriesLoading && uniqueTopCategories.length > 0) && (
        <section>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Top Categories</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Explore our most popular categories.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {uniqueTopCategories.map(category => (
              <Link
                key={category.id}
                to={`/shop/${genderToUrlKey(category.gender)}/${slugifyCategoryTitle(category.title)}/${category.id}`}
                className="group flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all mb-3">
                  <img 
                    src={category.img}
                    alt={displayCategoryTitleInEnglish(category.title)}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150.png?text=No+Image" }}
                  />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {displayCategoryTitleInEnglish(category.title)}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
      {categoriesLoading && uniqueTopCategories.length === 0 && <div className="text-center py-8">Loading top categories...</div>}
      {categoriesError && uniqueTopCategories.length === 0 && <div className="text-center py-8 text-red-500">Error loading categories: {categoriesError}</div>}
      
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