import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import ProductCard from '../components/ProductCard';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

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


const ShopPage = () => {
  const { gender, categoryName, categoryId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { 
    productList, 
    totalProducts, 
    loading: productsLoading, 
    error: productsError 
  } = useSelector(state => state.product);
  
  const { categories, loading: categoriesLoadingState } = useSelector(state => state.category);

  const [pageTitle, setPageTitle] = useState('Shop Our Products');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const queryParams = {
      limit: productsPerPage,
      offset: (currentPage - 1) * productsPerPage,
    };
    if (categoryId) {
      queryParams.category_id = categoryId;
    }
    dispatch(fetchProducts(queryParams));
  }, [dispatch, categoryId, currentPage, gender]);

  useEffect(() => {
    let titleForPage = 'Shop Our Products';
    if (categoryId && categories.length > 0) {
      const numericCategoryId = parseInt(categoryId, 10);
      const currentCategory = categories.find(cat => cat.id === numericCategoryId);
      if (currentCategory) {
        const genderText = currentCategory.gender === 'k' ? 'Women' : currentCategory.gender === 'e' ? 'Men' : '';
        titleForPage = `${genderText} ${displayCategoryTitleInEnglish(currentCategory.title)} Products`;
      } else if (categoryName) {
        const displayGender = gender === 'women' ? 'Women' : gender === 'men' ? 'Men' : '';
        titleForPage = `${displayGender} ${categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Products`;
      } else {
         titleForPage = "All Products in Category";
      }
    } else if (gender) {
        const displayGender = gender === 'women' ? 'Women' : gender === 'men' ? 'Men' : '';
        titleForPage = `All ${displayGender}'s Products`;
    }
    setPageTitle(titleForPage);
  }, [categoryId, gender, categoryName, categories]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, categoryId, gender, location.search]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const totalPages = totalProducts > 0 ? Math.ceil(totalProducts / productsPerPage) : 0;

  return (
    <div className="flex flex-col">
      <div className="mb-6 md:mb-8 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          {pageTitle}
        </h1>
        {(!categoryId && !gender) && <p className="text-gray-600 mt-1 sm:mt-2">Discover a wide range of high-quality items.</p>}
      </div>

      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="md:w-1/3 lg:w-1/4">
          <button className="md:hidden w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-md flex items-center justify-center gap-2 border border-gray-300">
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
        <div className="flex items-center justify-between md:justify-end gap-3 text-sm">
          <span className="text-gray-600">Showing {productList.length > 0 ? productList.length : 0} of {totalProducts} products</span>
          <select className="border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option>Sort by relevance</option>
            <option>Sort by price: low to high</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-x-6 lg:gap-x-8">
        <aside className="hidden md:block md:w-1/4 lg:w-1/5 mb-8 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
          {categoriesLoadingState ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : categories && categories.length > 0 ? (
            <ul className="space-y-1 text-sm">
              {categories.map(cat => (
                   <li key={cat.id}>
                       <Link 
                           to={`/shop/${genderToUrlKey(cat.gender)}/${slugifyCategoryTitle(cat.title)}/${cat.id}`}
                           className={`block py-1.5 px-2 rounded-md hover:bg-gray-100 ${categoryId === cat.id.toString() ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700 hover:text-blue-600'}`}
                       >
                           {displayCategoryTitleInEnglish(cat.title)}
                       </Link>
                   </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No categories found.</p>
          )}
        </aside>

        <div className="flex-1">
          {productsLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
            </div>
          ) : productsError ? (
            <div className="text-center text-red-600 py-20 col-span-full">
              Error: {productsError}
            </div>
          ) : productList && productList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8 sm:gap-x-6">
              {productList.map((product) => (
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
            <div className="text-center text-gray-500 py-20 col-span-full">
              No products found for this selection.
            </div>
          )}

          {!productsLoading && totalProducts > 0 && totalPages > 1 && (
            <div className="mt-10 md:mt-12 flex justify-center">
              <nav className="flex rounded-md shadow-sm" aria-label="Pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  <ChevronLeft size={18} className="mr-1" /> Previous
                </button>
                {[...Array(totalPages).keys()].map(pageNumber => {
                    const page = pageNumber + 1;
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                aria-current={currentPage === page ? "page" : undefined}
                                className={`relative hidden md:inline-flex items-center px-4 py-2 border text-sm font-medium
                                            ${currentPage === page ? 'z-10 border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                {page}
                            </button>
                        );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                        if ( (page === currentPage - 2 && currentPage -3 !== 1) || (page === currentPage + 2 && currentPage + 3 !== totalPages) ) {
                           return <span key={page} className="relative hidden md:inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>;
                        }
                    }
                    return null;
                })}
                 <span className="relative md:hidden inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  Next <ChevronRight size={18} className="ml-1" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;