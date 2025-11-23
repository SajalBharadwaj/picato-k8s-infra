'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import ProtectedRoute from '../../components/ProtectedRoute';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen">


      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mb-6">
            Thank you for your order. Your order is being prepared.
          </p>

          {orderId && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="text-lg font-semibold text-gray-900">{orderId}</p>
            </div>
          )}

          <p className="text-sm text-gray-600 mb-8">
            A confirmation email has been sent to your email address.
          </p>

          <div className="space-y-3">
            <Link
              href="/menu"
              className="block w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <ProtectedRoute requiredRole="customer">
      <OrderSuccessContent />
    </ProtectedRoute>
  );
}
