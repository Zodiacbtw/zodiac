import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import ProductCard from '../components/ProductCard';
import { Loader2, ChevronLeft, ChevronRight, Filter as FilterIcon } from 'lucide-react';

const slugify = (text) => {
    if (!text) return '';
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return text.toString().toLowerCase().replace(/ı/g, 'i').replace(/\s+/g, '-').replace(p, c => b.charAt(a.indexOf(c))).replace(/&/g, '-and-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
};
const categoryTitleToEnglishMap = { 'Tişört': 'T-shirt', 'Ayakkabı': 'Shoes', 'Ceket': 'Jackets', 'Elbise': 'Dresses', 'Etek': 'Skirts', 'Gömlek': 'Shirts', 'Kazak': 'Sweaters', 'Pantolon': 'Pants', 'Pantalon': 'Pants' };
const displayCategoryTitleInEnglish = (turkishTitle) => { if (!turkishTitle) return 'Category'; const correctedTitle = (turkishTitle.toLowerCase() === 'pantalon') ? 'Pantolon' : turkishTitle; return categoryTitleToEnglishMap[correctedTitle] || turkishTitle; };
const genderToUrlKey = (genderApiValue) => (genderApiValue === 'k' ? 'women' : genderApiValue === 'e' ? 'men' : 'unisex');
const DOTS = '...';
const generatePaginationRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalPageNumbers = siblingCount + 5;
  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
  const firstPageIndex = 1;
  const lastPageIndex = totalPages;
  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, DOTS, totalPages];
  }
  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);
    return [firstPageIndex, DOTS, ...rightRange];
  }
  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
  return [];
};


const ShopPage = () => {
  const { gender, categoryName, categoryId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { productList, totalProducts, loading: productsLoading, error: productsError } = useSelector(state => state.product);
  const { categories } = useSelector(state => state.category);

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const currentPage = parseInt(queryParams.get('page')) || 1;

  const [pageTitle, setPageTitle] = useState('Shop Our Products');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const productsPerPage = 12;

  useEffect(() => {
    const offset = (currentPage - 1) * productsPerPage;
    const fetchParams = { limit: productsPerPage, offset: offset };
    if (categoryId) {
      fetchParams.category_id = categoryId;
    }
    dispatch(fetchProducts(fetchParams));
  }, [dispatch, categoryId, currentPage]);

  useEffect(() => {
    let titleForPage = 'All Products';
    if (categoryId && categories.length > 0) {
      const numericCategoryId = parseInt(categoryId, 10);
      const currentCategory = categories.find(cat => cat.id === numericCategoryId);
      if (currentCategory) {
        const genderText = currentCategory.gender === 'k' ? 'Women' : currentCategory.gender === 'e' ? 'Men' : '';
        const categoryText = displayCategoryTitleInEnglish(currentCategory.title);
        titleForPage = `${genderText} ${categoryText}`;
      }
    } else if (gender) {
      const displayGender = gender === 'women' ? "Women's" : gender === 'men' ? "Men's" : '';
      if (displayGender) {
        titleForPage = `All ${displayGender} Products`;
      }
    }
    setPageTitle(titleForPage);
  }, [categoryId, gender, categoryName, categories]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, location.pathname]);


  const totalPages = totalProducts > 0 ? Math.ceil(totalProducts / productsPerPage) : 0;
  
  const handlePageChange = (newPage) => {
    if (newPage !== DOTS && newPage > 0 && newPage <= totalPages && newPage !== currentPage) {
      history.push(`${location.pathname}?page=${newPage}`);
    }
  };

  const paginationRange = useMemo(() => {
    return generatePaginationRange(currentPage, totalPages);
  }, [currentPage, totalPages]);
  
  const renderCategoryList = (isMobile = false) => (
    <ul className="space-y-1 text-sm">
      <li className={isMobile ? "border-b" : ""}>
        <Link to="/shop" onClick={() => isMobile && setIsMobileFilterOpen(false)} className={`block py-2 px-2 rounded-md hover:bg-gray-100 ${!categoryId && !gender ? 'text-blue-600 font-semibold bg-blue-100' : 'text-gray-700 hover:text-blue-600'}`}>
            All Products
        </Link>
      </li>
      {categories?.map(cat => (
         <li key={cat.id} className={isMobile ? "border-b" : ""}>
             <Link to={`/shop/${genderToUrlKey(cat.gender)}/${slugify(cat.title)}/${cat.id}`} onClick={() => isMobile && setIsMobileFilterOpen(false)} className={`block py-2 px-2 rounded-md hover:bg-gray-100 ${categoryId === cat.id.toString() ? 'text-blue-600 font-semibold bg-blue-100' : 'text-gray-700 hover:text-blue-600'}`}>
                 {displayCategoryTitleInEnglish(cat.title)}
             </Link>
         </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col">
      <div className="mb-8 text-center"><h1 className="text-4xl font-bold text-gray-900">{pageTitle}</h1></div>
      
      <div className="flex flex-col md:flex-row gap-x-8">
        <aside className="hidden md:block md:w-1/4 lg:w-1/5 mb-8 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
          {renderCategoryList(false)}
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="md:hidden">
              <button onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-md flex items-center justify-center gap-2 border border-gray-300">
                <FilterIcon size={18} /><span>Filters / Categories</span>
              </button>
              {isMobileFilterOpen && <div className="mt-2 p-4 bg-white border rounded-md shadow-lg">{renderCategoryList(true)}</div>}
            </div>
            <div className="flex items-center justify-between md:justify-end gap-3 text-sm">
              <span className="text-gray-600">Showing {productList.length > 0 ? `${(currentPage - 1) * productsPerPage + 1}-${Math.min(currentPage * productsPerPage, totalProducts)}` : 0} of {totalProducts} products</span>
            </div>
          </div>
          
          {productsLoading ? (
            <div className="flex justify-center items-center py-20 min-h-[300px]"><Loader2 className="animate-spin h-12 w-12 text-blue-600" /></div>
          ) : productsError ? (
            <div className="text-center text-red-600 py-20 min-h-[300px]">Error: {productsError}</div>
          ) : productList && productList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-20 min-h-[300px]">No products found for this selection.</div>
          )}

          {!productsLoading && totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center rounded-md shadow-sm" aria-label="Pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"><ChevronLeft size={18} /></button>
                {paginationRange && paginationRange.map((pageNumber, index) => {
                  if (pageNumber === DOTS) {
                    return <span key={`${DOTS}-${index}`} className="relative inline-flex items-center px-4 py-2 border-y border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>;
                  }
                  return (
                    <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} aria-current={currentPage === pageNumber ? "page" : undefined} className={`relative inline-flex items-center px-4 py-2 border-y text-sm font-medium ${currentPage === pageNumber ? 'z-10 border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}>{pageNumber}</button>
                  );
                })}
                <span className="hidden">Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"><ChevronRight size={18} /></button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;