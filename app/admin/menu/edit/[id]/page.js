'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getMenuItemById, updateMenuItem } from '../../../../../lib/firestore';
import { validateRequired, validatePrice } from '../../../../../utils/validators';

export default function EditMenuItemPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'burger',
    imageUrl: '',
    smallPrice: '',
    mediumPrice: '',
    largePrice: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();
  const params = useParams();
  const itemId = params.id;

  useEffect(() => {
    loadMenuItem();
  }, [itemId]);

  async function loadMenuItem() {
    try {
      const item = await getMenuItemById(itemId);
      if (item) {
        setFormData({
          name: item.name,
          description: item.description,
          category: item.category,
          imageUrl: item.imageUrl,
          smallPrice: item.prices.small.toString(),
          mediumPrice: item.prices.medium.toString(),
          largePrice: item.prices.large.toString(),
        });
      }
    } catch (err) {
      console.error('[loadMenuItem]', err);
    } finally {
      setLoadingData(false);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateRequired(formData.name)) {
      setError('Name is required');
      return;
    }

    if (!validateRequired(formData.description)) {
      setError('Description is required');
      return;
    }

    if (!validatePrice(formData.smallPrice) || !validatePrice(formData.mediumPrice) || !validatePrice(formData.largePrice)) {
      setError('All prices must be valid numbers greater than 0');
      return;
    }

    setLoading(true);

    try {
      await updateMenuItem(itemId, {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        imageUrl: formData.imageUrl,
        prices: {
          small: parseFloat(formData.smallPrice),
          medium: parseFloat(formData.mediumPrice),
          large: parseFloat(formData.largePrice),
        },
      });

      router.push('/admin/menu');
    } catch (err) {
      console.error('[updateMenuItem]', err);
      setError('Failed to update menu item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Menu Item</h1>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="burger">Burger</option>
              <option value="pizza">Pizza</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Small Price</label>
              <input
                type="number"
                name="smallPrice"
                value={formData.smallPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Medium Price</label>
              <input
                type="number"
                name="mediumPrice"
                value={formData.mediumPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Large Price</label>
              <input
                type="number"
                name="largePrice"
                value={formData.largePrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 text-white py-2 rounded-md font-medium hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Item'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/admin/menu')}
              className="px-6 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
