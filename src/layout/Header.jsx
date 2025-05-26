import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Pages', path: '/pages' },
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

          <nav className="hidden md:flex md:space-x-5 lg:space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-blue-600">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="text-gray-500 hover:text-blue-600">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="text-gray-500 hover:text-blue-600 relative">
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
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
            <div className="flex justify-start space-x-6 pt-4 pl-3 mt-3 border-t">
                <button className="text-gray-500 hover:text-blue-600"> <Search size={22} strokeWidth={1.5}/> </button>
                <button className="text-gray-500 hover:text-blue-600"> <User size={22} strokeWidth={1.5}/> </button>
                <button className="text-gray-500 hover:text-blue-600 relative"> <ShoppingCart size={22} strokeWidth={1.5}/> <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">3</span></button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;