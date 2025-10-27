'use client';

import { useState } from 'react';
import { formatCurrency, formatDate, formatTime } from '../utils/formatters';

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <h3 className="font-semibold text-gray-900">{order.orderId}</h3>
              <span className="text-sm text-gray-500">
                {formatDate(order.orderDate)} at {formatTime(order.orderDate)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {order.userName} ({order.userEmail})
            </p>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-primary-600">
              {formatCurrency(order.totalAmount)}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              {order.paymentMethod}
            </p>
          </div>

          <button className="ml-4 text-gray-400">
            <svg
              className={`w-6 h-6 transition-transform ${
                expanded ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-3">Order Items:</h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex-1">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600 ml-2">
                    ({item.size}, x{item.quantity})
                  </span>
                </div>
                <span className="font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-300">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="text-lg font-bold text-primary-600">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
              <span>
                Payment: <span className="font-medium capitalize">{order.paymentMethod}</span>
              </span>
              <span>
                Status: <span className="font-medium capitalize">{order.paymentStatus}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
