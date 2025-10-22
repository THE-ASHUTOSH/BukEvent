
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive ? 'bg-brand-purple text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">
              BukEvent
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/events" className={navLinkClass}>Events</NavLink>
              {user && <NavLink to="/profile" className={navLinkClass}>My Bookings</NavLink>}
              {isAdmin && <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>}
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <button
                onClick={logout}
                className="bg-brand-pink hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="bg-transparent border border-brand-purple hover:bg-brand-purple text-white font-bold py-2 px-4 rounded-full transition-all duration-300">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-brand-purple to-brand-pink hover:from-brand-pink hover:to-brand-purple text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 hover:scale-105">
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/events" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Events</NavLink>
            {user && <NavLink to="/profile" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>My Bookings</NavLink>}
            {isAdmin && <NavLink to="/admin" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Admin</NavLink>}
            <div className="mt-4 pt-4 border-t border-gray-700">
             {user ? (
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
