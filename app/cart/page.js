'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import CartItem from '../../components/CartItem';
import ProtectedRoute from '../../components/ProtectedRoute';
import { formatCurrency } from '../../utils/formatters';

function CartPageContent() {
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen">
      

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <Link
              href="/menu"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item, index) => (
                <CartItem
                  key={`${item.menuItemId}-${item.size}-${index}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">Subtotal:</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-primary-700 transition"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/menu"
                className="block text-center text-primary-600 mt-4 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function CartPage() {
  return (
   <ProtectedRoute requiredRole={['customer', 'admin']}>
      <CartPageContent />
    </ProtectedRoute>
  );
}
