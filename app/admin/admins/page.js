'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { getAdmins, deleteAdmin } from '../../../lib/firestore';
import { formatDate } from '../../../utils/formatters';
import ProtectedRoute from '../../../components/ProtectedRoute';

function AdminsPageContent() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    try {
      const allAdmins = await getAdmins();
      setAdmins(allAdmins);
    } catch (error) {
      console.error('[loadAdmins]', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(adminId, adminEmail) {
    if (adminId === currentUser.uid) {
      alert('You cannot delete your own account');
      return;
    }

    if (!confirm(`Are you sure you want to delete admin "${adminEmail}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteAdmin(adminId);
      await loadAdmins();
    } catch (error) {
      console.error('[handleDelete]', error);
      alert('Failed to delete admin');
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Management</h1>
        <Link
          href="/admin/admins/create"
          className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition"
        >
          Create New Admin
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.role === 'super_admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(admin.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {admin.role !== 'super_admin' && (
                      <button
                        onClick={() => handleDelete(admin.id, admin.email)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminsPage() {
  return (
    <ProtectedRoute requiredRole="super_admin">
      <AdminsPageContent />
    </ProtectedRoute>
  );
}
