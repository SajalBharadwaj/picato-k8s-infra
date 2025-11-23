'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getMenuItems } from '../../lib/firestore';
import Navbar from '../../components/Navbar';
import MenuItemCard from '../../components/MenuItemCard';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showSuccess, setShowSuccess] = useState(false);
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

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

  const handleAddToCart = async (item, size, quantity) => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const result = await addToCart(item, size, quantity);
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const filteredItems = menuItems.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="min-h-screen">
        <div className="relative bg-primary-900 py-24 h-[50vh] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Our Delicious <span className="text-primary-400">Menu</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore our wide variety of mouth-watering burgers, pizzas, and sides. Made with fresh ingredients and served
          with love.
        </p>
      </div>
    </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        {showSuccess && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
            Added to cart successfully!
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory('burger')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeCategory === 'burger'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Burgers
          </button>
          <button
            onClick={() => setActiveCategory('pizza')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeCategory === 'pizza'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pizzas
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No items available right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
