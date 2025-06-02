import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X, ChevronDown, UserPlus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  
  const { categories, loading: categoriesLoading } = useSelector(state => state.category);

  const categorizedByGender = categories.reduce((acc, category) => {
    const genderKey = category.gender === 'k' ? 'Kadın' : category.gender === 'e' ? 'Erkek' : 'Diğer';
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
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors focus:outline-none"
              >
                Shop <ChevronDown size={16} className={`ml-1 transform transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {isShopDropdownOpen && (
                <div 
                  onMouseEnter={() => setIsShopDropdownOpen(true)}
                  onMouseLeave={() => setIsShopDropdownOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg origin-top-center"
                >
                  <div className="rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {categoriesLoading ? (
                      <div className="p-8 text-center text-gray-500">Loading categories...</div>
                    ) : (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-6 p-6">
                        {Object.entries(categorizedByGender).sort().map(([gender, genderCategories]) => (
                          <div key={gender}>
                            <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase mb-3 border-b pb-1.5">
                              {gender}
                            </h3>
                            <ul className="space-y-1.5">
                              {genderCategories.slice(0, 5).map((category) => (
                                <li key={category.id}>
                                  <Link
                                    to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${slugify(category.title)}/${category.id}`}
                                    onClick={() => setIsShopDropdownOpen(false)}
                                    className="block text-sm text-gray-700 hover:text-blue-700 hover:bg-gray-50 p-1.5 rounded-md transition-colors"
                                  >
                                    {category.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
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
            <button className="text-gray-500 hover:text-blue-600 relative" title="Shopping Cart">
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
             <Link to="/signup" className="text-gray-500 hover:text-blue-600 mr-3" title="Sign Up">
              <UserPlus size={24} strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                {Object.entries(categorizedByGender).sort().map(([gender, genderCategories]) => (
                    <div key={gender} className="mt-1">
                        <h4 className="px-3 py-1 text-xs font-medium text-gray-800">{gender}</h4>
                        {genderCategories.slice(0,5).map(category => (
                            <Link
                                key={category.id}
                                to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${slugify(category.title)}/${category.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block pl-6 pr-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex justify-start items-center space-x-6 pt-4 pl-3 mt-3 border-t">
                <button className="text-gray-500 hover:text-blue-600"> <Search size={22} strokeWidth={1.5}/> </button>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-blue-600" title="Login"> <User size={22} strokeWidth={1.5}/> </Link>
                <button className="text-gray-500 hover:text-blue-600 relative" title="Shopping Cart"> <ShoppingCart size={22} strokeWidth={1.5}/> <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">3</span></button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;