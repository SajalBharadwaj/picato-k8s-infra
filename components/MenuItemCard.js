'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatCurrency } from '../utils/formatters';

export default function MenuItemCard({ item, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    await onAddToCart(item, selectedSize, quantity);
    setAdding(false);
    setQuantity(1);
  };

  if (!item.available) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative opacity-60">
        <div className="relative h-48">
          <Image
            src={item.imageUrl || '/placeholder-food.jpg'}
            alt={item.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Unavailable</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48">
        <Image
          src={item.imageUrl || '/placeholder-food.jpg'}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Size:
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedSize('small')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                selectedSize === 'small'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              S - {formatCurrency(item.prices.small)}
            </button>
            <button
              onClick={() => setSelectedSize('medium')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                selectedSize === 'medium'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              M - {formatCurrency(item.prices.medium)}
            </button>
            <button
              onClick={() => setSelectedSize('large')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                selectedSize === 'large'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              L - {formatCurrency(item.prices.large)}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition disabled:opacity-50"
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
