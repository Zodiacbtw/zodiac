import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X, ChevronDown, UserPlus } from 'lucide-react';
import { useSelector } from 'react-redux';

const categoryTitleToEnglishMap = {
  'Tişört': 'T-shirt',
  'Ayakkabı': 'Shoes',
  'Ceket': 'Jackets',
  'Elbise': 'Dresses',
  'Etek': 'Skirts',
  'Gömlek': 'Shirts',
  'Kazak': 'Sweaters',
  'Pantolon': 'Pants',
  'Pantalon': 'Pants',
};

const categoryTitleToSlugMap = {
  'Tişört': 't-shirt',
  'Ayakkabı': 'shoes',
  'Ceket': 'jackets',
  'Elbise': 'dresses',
  'Etek': 'skirts',
  'Gömlek': 'shirts',
  'Kazak': 'sweaters',
  'Pantolon': 'pants',
  'Pantalon': 'pants',
};

const slugifyCategoryTitle = (title) => {
  if (!title) return 'category';
  const correctedTitle = (title.toLowerCase() === 'pantalon') ? 'Pantolon' : title;
  
  if (categoryTitleToSlugMap[correctedTitle]) {
    return categoryTitleToSlugMap[correctedTitle];
  }
  return correctedTitle
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const genderToUrlKey = (genderApiValue) => {
  if (genderApiValue === 'k') return 'women';
  if (genderApiValue === 'e') return 'men';
  return 'unisex';
};

const genderDisplay = (genderApiValue) => {
  if (genderApiValue === 'k') return 'Women';
  if (genderApiValue === 'e') return 'Men';
  return 'Other';
}

const displayCategoryTitleInEnglish = (turkishTitle) => {
  if (!turkishTitle) return 'Category';
  const correctedTitle = (turkishTitle.toLowerCase() === 'pantalon') ? 'Pantolon' : turkishTitle;
  return categoryTitleToEnglishMap[correctedTitle] || turkishTitle;
};


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false); 
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  
  const { categories, loading: categoriesLoading } = useSelector(state => state.category);
  const { cart: cartItems } = useSelector(state => state.shoppingCart);
  const totalItemCount = cartItems.reduce((total, item) => total + item.count, 0);

  const categorizedByGender = categories.reduce((acc, category) => {
    const genderKey = genderDisplay(category.gender);
    if (!acc[genderKey]) {
      acc[genderKey] = [];
    }
    acc[genderKey].push(category);
    return acc;
  }, {});

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-900">
              Zodiac
            </Link>
          </div>

          <nav className="hidden md:flex items-center md:space-x-5 lg:space-x-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                exact
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                activeClassName="text-blue-600"
              >
                {link.name}
              </NavLink>
            ))}
            <div 
              className="relative pb-4 -mb-4" //
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <button
                className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors focus:outline-none"
              >
                Shop <ChevronDown size={16} className={`ml-1 transform transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {isShopDropdownOpen && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-auto min-w-[30rem] md:min-w-[36rem] lg:min-w-[42rem] origin-top-center"
                >
                  <div className="rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5">
                    {categoriesLoading ? (
                      <div className="p-12 text-center text-gray-500">Loading categories...</div>
                    ) : Object.keys(categorizedByGender).length > 0 ? (
                      <div className="grid grid-cols-2 gap-x-6 md:gap-x-8 p-6 md:p-8">
                        {['Men', 'Women'].map(genderKey => {
                          const genderCategories = categorizedByGender[genderKey];
                          if (!genderCategories || genderCategories.length === 0) return null;

                          return (
                            <div key={genderKey}>
                              <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase mb-4 border-b-2 border-gray-200 pb-2">
                                {genderKey}
                              </h3>
                              <ul className="space-y-2">
                                {genderCategories.map((category) => (
                                  <li key={category.id}>
                                    <Link
                                      to={`/shop/${genderToUrlKey(category.gender)}/${slugifyCategoryTitle(category.title)}/${category.id}`}
                                      onClick={() => setIsShopDropdownOpen(false)}
                                      className="block text-sm text-gray-600 hover:text-blue-700 hover:bg-gray-50 p-2 rounded-md transition-colors"
                                    >
                                      {displayCategoryTitleInEnglish(category.title)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">No categories found.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-blue-600">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to="/signup" className="text-gray-500 hover:text-blue-600" title="Sign Up">
              <UserPlus size={20} strokeWidth={1.5} />
            </Link>
            <Link to="/login" className="text-gray-500 hover:text-blue-600" title="Login">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <div 
              className="relative pb-4 -mb-4"
              onMouseEnter={() => setIsCartDropdownOpen(true)}
              onMouseLeave={() => setIsCartDropdownOpen(false)}
            >
              <Link to="/cart" className="text-gray-500 hover:text-blue-600 relative block p-2" title="Shopping Cart">
                <ShoppingCart size={20} strokeWidth={1.5} />
                {totalItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItemCount}
                  </span>
                )}
              </Link>
              {isCartDropdownOpen && cartItems && ( 
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl p-4 border z-50">
                    <h3 className="font-bold text-lg mb-3 border-b pb-2">Sepetim ({totalItemCount} Ürün)</h3>
                    <div className="max-h-80 overflow-y-auto pr-2">
                      {cartItems.length > 0 ? (
                        cartItems.map(item => (
                          <div key={item.product.id} className="flex items-start py-3 border-b last:border-b-0">
                            <img src={item.product.images[0].url} alt={item.product.name} className="w-16 h-16 object-cover rounded-md mr-4"/>
                            <div className="flex-1">
                              <p className="font-semibold text-sm leading-tight">{item.product.name}</p>
                              <p className="text-xs text-gray-500 mt-1">Beden: {item.product.size || "Tek Ebat"}</p>
                              <p className="text-xs text-gray-500">Adet: {item.count}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-orange-600">{item.product.price.toFixed(2)} TL</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500 py-10">Sepetiniz boş.</p>
                      )}
                    </div>
                    {cartItems.length > 0 && (
                      <div className="mt-4 flex gap-3">
                        <Link to="/cart" className="flex-1 text-center bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium">
                          Sepete Git
                        </Link>
                        <Link to="/checkout" className="flex-1 text-center bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors font-semibold">
                          Siparişi Tamamla
                        </Link>
                      </div>
                    )}
                  </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
             <Link to="/signup" className="text-gray-500 hover:text-blue-600 mr-3" title="Sign Up">
              <UserPlus size={24} strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl z-40 border-t border-gray-200">
          <nav className="flex flex-col px-4 pt-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t mt-2">
                <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">Shop Categories</h3>
                {['Men', 'Women'].map(genderKey => {
                    const genderCategories = categorizedByGender[genderKey];
                    if (!genderCategories || genderCategories.length === 0) return null;
                    return (
                        <div key={genderKey} className="mt-1">
                            <h4 className="px-3 py-1 text-xs font-medium text-gray-800">{genderKey}</h4>
                            {genderCategories.map(category => (
                                <Link
                                    key={category.id}
                                    to={`/shop/${genderToUrlKey(category.gender)}/${slugifyCategoryTitle(category.title)}/${category.id}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block pl-6 pr-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                >
                                    {displayCategoryTitleInEnglish(category.title)}
                                </Link>
                            ))}
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-start items-center space-x-6 pt-4 pl-3 mt-3 border-t">
                <button className="text-gray-500 hover:text-blue-600"> <Search size={22} strokeWidth={1.5}/> </button>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-blue-600" title="Login"> <User size={22} strokeWidth={1.5}/> </Link>
                <Link to="/cart" className="text-gray-500 hover:text-blue-600 relative" title="Shopping Cart"> 
                  <ShoppingCart size={22} strokeWidth={1.5}/>
                  {totalItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItemCount}
                    </span>
                  )}
                </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;