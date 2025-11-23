'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import ProtectedRoute from '../../components/ProtectedRoute';
import { formatCurrency } from '../../utils/formatters';

function CheckoutPageContent() {
  const { currentUser } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('stripe');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleStripePayment = async () => {
    setProcessing(true);
    setError('');

    try {
      // Create Stripe payment intent
      const response = await fetch('/api/payment/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: subtotal,
          cartItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      // Create order
      await createOrder('stripe', data.paymentIntentId);
    } catch (err) {
      console.error('[handleStripePayment]', err);
      setError(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const createPayPalOrder = async () => {
    try {
      const response = await fetch('/api/payment/paypal/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: subtotal,
          cartItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create PayPal order');
      }

      return data.orderId;
    } catch (err) {
      console.error('[createPayPalOrder]', err);
      throw err;
    }
  };

  const capturePayPalOrder = async (orderId) => {
    try {
      const response = await fetch('/api/payment/paypal/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to capture PayPal payment');
      }

      // Create order
      await createOrder('paypal', orderId);
    } catch (err) {
      console.error('[capturePayPalOrder]', err);
      throw err;
    }
  };

  const createOrder = async (paymentMethod, paymentId) => {
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.uid,
          cartItems,
          totalAmount: subtotal,
          paymentMethod,
          paymentId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      await clearCart();
      router.push(`/order-success?orderId=${data.orderId}`);
    } catch (err) {
      console.error('[createOrder]', err);
      throw err;
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <a
            href="/menu"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition"
          >
            Browse Menu
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.name} ({item.size}) x {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <button
                  onClick={() => setSelectedMethod('stripe')}
                  className={`w-full p-4 rounded-lg border-2 mb-3 transition ${
                    selectedMethod === 'stripe'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        selectedMethod === 'stripe'
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-gray-400'
                      }`}
                    >
                      {selectedMethod === 'stripe' && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">Credit/Debit Card (Stripe)</span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedMethod('paypal')}
                  className={`w-full p-4 rounded-lg border-2 transition ${
                    selectedMethod === 'paypal'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        selectedMethod === 'paypal'
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-gray-400'
                      }`}
                    >
                      {selectedMethod === 'paypal' && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">PayPal</span>
                  </div>
                </button>
              </div>

              {selectedMethod === 'stripe' ? (
                <button
                  onClick={handleStripePayment}
                  disabled={processing}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-primary-700 transition disabled:opacity-50"
                >
                  {processing ? 'Processing...' : `Pay ${formatCurrency(subtotal)}`}
                </button>
              ) : (
                <PayPalScriptProvider
                  options={{
                    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                    currency: 'USD',
                  }}
                >
                  <PayPalButtons
                    createOrder={createPayPalOrder}
                    onApprove={(data) => capturePayPalOrder(data.orderID)}
                    onError={(err) => {
                      console.error('[PayPal]', err);
                      setError('PayPal payment failed. Please try again.');
                    }}
                    style={{ layout: 'vertical' }}
                  />
                </PayPalScriptProvider>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute requiredRole={['customer', 'admin']}>
      <CheckoutPageContent />
    </ProtectedRoute>
  );
}
