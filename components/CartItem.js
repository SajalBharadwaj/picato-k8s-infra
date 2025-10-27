'use client';

import Image from 'next/image';
import { formatCurrency } from '../utils/formatters';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={item.imageUrl || '/placeholder-food.jpg'}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600">
          Size: {item.size.charAt(0).toUpperCase() + item.size.slice(1)}
        </p>
        <p className="text-sm font-medium text-primary-600">
          {formatCurrency(item.price)} each
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.menuItemId, item.size, item.quantity - 1)}
          className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          -
        </button>
        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.menuItemId, item.size, item.quantity + 1)}
          className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>

      <button
        onClick={() => onRemove(item.menuItemId, item.size)}
        className="text-red-600 hover:text-red-700 transition"
        title="Remove item"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
