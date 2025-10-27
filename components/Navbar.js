'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { currentUser, userRole, logout } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">PICATO</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Menu
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {currentUser && userRole === 'customer' && (
              <Link
                href="/cart"
                className="relative text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {currentUser ? (
              <>
                <span className="text-gray-700 text-sm">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
            >
              Menu
            </Link>
            {currentUser && userRole === 'customer' && (
              <Link
                href="/cart"
                className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
              >
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            )}
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
