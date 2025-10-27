'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { userRole, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin-login';
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-primary-400">PICATO Admin</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/admin/dashboard"
          className={`block px-4 py-2 rounded-md transition ${
            isActive('/admin/dashboard')
              ? 'bg-primary-600 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/admin/orders"
          className={`block px-4 py-2 rounded-md transition ${
            isActive('/admin/orders')
              ? 'bg-primary-600 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          Orders
        </Link>

        <Link
          href="/admin/menu"
          className={`block px-4 py-2 rounded-md transition ${
            isActive('/admin/menu')
              ? 'bg-primary-600 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          Menu Management
        </Link>

        <Link
          href="/admin/analytics"
          className={`block px-4 py-2 rounded-md transition ${
            isActive('/admin/analytics')
              ? 'bg-primary-600 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          Analytics
        </Link>

        {userRole === 'super_admin' && (
          <Link
            href="/admin/admins"
            className={`block px-4 py-2 rounded-md transition ${
              isActive('/admin/admins')
                ? 'bg-primary-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Admin Management
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
