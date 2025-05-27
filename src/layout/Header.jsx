import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Search, User as UserIcon, ShoppingCart, Menu, X, UserPlus, LogOut, LogInIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions/clientActions';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector(state => state.client.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser(history));
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Team', path: '/team' },
    // { name: 'Blog', path: '/blog' },
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
            <button className="text-gray-500 hover:text-blue-600" title="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            {user ? (
              <>
                <div className="flex items-center space-x-2 cursor-default" title={user.email || ''}>
                  {user.gravatarUrl && (
                    <img
                      src={user.gravatarUrl}
                      alt={user.name || 'User Avatar'}
                      className="w-8 h-8 rounded-full border border-gray-200"
                    />
                  )}
                  {user.name && (
                    <span className="text-sm font-medium text-gray-700 hidden lg:block">
                      {user.name}
                    </span>
                  )}
                </div>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600" title="Logout">
                  <LogOut size={20} strokeWidth={1.5} />
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="text-gray-500 hover:text-blue-600" title="Sign Up">
                  <UserPlus size={20} strokeWidth={1.5} />
                </Link>
                <Link to="/login" className="text-gray-500 hover:text-blue-600" title="Login">
                  <LogInIcon size={20} strokeWidth={1.5} />
                </Link>
              </>
            )}
            <button className="text-gray-500 hover:text-blue-600 relative" title="Shopping Cart">
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            {user ? (
                 <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 mr-3" title="Logout">
                    <LogOut size={24} strokeWidth={1.5} />
                </button>
            ) : (
                 <>
                    <Link to="/signup" className="text-gray-500 hover:text-blue-600 mr-3" title="Sign Up">
                        <UserPlus size={24} strokeWidth={1.5} />
                    </Link>
                    <Link to="/login" className="text-gray-500 hover:text-blue-600 mr-4" title="Login">
                        <LogInIcon size={24} strokeWidth={1.5} />
                    </Link>
                 </>
            )}
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
            <div className="flex justify-around items-center pt-4 mt-3 border-t">
                <button className="text-gray-500 hover:text-blue-600"> <Search size={22} strokeWidth={1.5}/> </button>
                <button className="text-gray-500 hover:text-blue-600 relative"> <ShoppingCart size={22} strokeWidth={1.5}/> <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">3</span></button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;