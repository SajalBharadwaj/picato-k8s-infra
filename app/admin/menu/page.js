'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getMenuItems, updateMenuItem, deleteMenuItem } from '../../../lib/firestore';
import { formatCurrency } from '../../../utils/formatters';

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenu();
  }, []);

  async function loadMenu() {
    try {
      const items = await getMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error('[loadMenu]', error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleAvailability(itemId, currentStatus) {
    try {
      await updateMenuItem(itemId, { available: !currentStatus });
      await loadMenu();
    } catch (error) {
      console.error('[toggleAvailability]', error);
      alert('Failed to update availability');
    }
  }

  async function handleDelete(itemId, itemName) {
    if (!confirm(`Are you sure you want to delete "${itemName}"?`)) {
      return;
    }

    try {
      await deleteMenuItem(itemId);
      await loadMenu();
    } catch (error) {
      console.error('[handleDelete]', error);
      alert('Failed to delete item');
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <Link
          href="/admin/menu/add"
          className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition"
        >
          Add New Item
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">No menu items yet</p>
          <Link
            href="/admin/menu/add"
            className="inline-block bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition"
          >
            Add First Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-40">
                <img
                  src={item.imageUrl || '/placeholder-food.jpg'}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {!item.available && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Unavailable
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2 capitalize">{item.category}</p>
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{item.description}</p>

                <div className="flex justify-between text-sm text-gray-700 mb-4">
                  <span>S: {formatCurrency(item.prices.small)}</span>
                  <span>M: {formatCurrency(item.prices.medium)}</span>
                  <span>L: {formatCurrency(item.prices.large)}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleAvailability(item.id, item.available)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                      item.available
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {item.available ? 'Disable' : 'Enable'}
                  </button>

                  <Link
                    href={`/admin/menu/edit/${item.id}`}
                    className="flex-1 px-3 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-center"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
