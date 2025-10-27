'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        // Not authenticated
        if (requiredRole === 'admin' || requiredRole === 'super_admin') {
          router.push('/admin-login');
        } else {
          router.push('/login');
        }
      } else if (requiredRole) {
        // Check role
        const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

        if (!allowedRoles.includes(userRole)) {
          // Wrong role
          if (userRole === 'customer') {
            router.push('/menu');
          } else {
            router.push('/admin/dashboard');
          }
        }
      }
    }
  }, [currentUser, userRole, loading, requiredRole, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowedRoles.includes(userRole)) {
      return null;
    }
  }

  return <>{children}</>;
}
