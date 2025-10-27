'use client';

import AdminSidebar from '../../components/AdminSidebar';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute requiredRole={['admin', 'super_admin']}>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 bg-gray-100">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
