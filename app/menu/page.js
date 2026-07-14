'use client';
import { useState } from 'react';
import MenuItemCard from '../../components/MenuItemCard';

export default function MenuPage() {
  // Dummy data code me hi hardcode kar diya
  const [items] = useState([
    {
      id: '1',
      name: 'Crispy Veg Burger',
      description: 'Loaded with a crunchy veg patty, fresh veggies, and creamy sauce.',
      price: 120,
      category: 'Burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500'
    },
    {
      id: '2',
      name: 'Cheese Burst Pizza',
      description: 'Overflowing with extra mozzarella cheese and classic tomato sauce.',
      price: 299,
      category: 'Pizzas',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500'
    },
    {
      id: '3',
      name: 'BBQ Chicken Burger',
      description: 'Juicy grilled chicken breast dripping in smoky BBQ sauce.',
      price: 180,
      category: 'Burgers',
      image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=500'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Burgers', 'Pizzas'];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our Delicious Menu</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore our wide variety of mouth-watering burgers and pizzas.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-colors duration-200 ${
                activeCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">No items available right now</div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
