'use client';

import { useState, useEffect } from 'react';
import { getWeeklySalesData, getOrders } from '../../../lib/firestore';
import BarChart from '../../../components/charts/BarChart';
import PieChart from '../../../components/charts/PieChart';
import Histogram from '../../../components/charts/Histogram';
import { formatCurrency } from '../../../utils/formatters';

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [weeklyRevenue, setWeeklyRevenue] = useState({ labels: [], data: [] });
  const [productSales, setProductSales] = useState({ labels: [], data: [] });
  const [categorySales, setCategorySales] = useState({ labels: [], data: [] });
  const [timeSales, setTimeSales] = useState({ labels: [], data: [] });

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  async function loadAnalyticsData() {
    try {
      // Get last 4 weeks of data
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 28);

      const orders = await getWeeklySalesData(startDate, endDate);

      // Weekly Revenue
      const weeks = {};
      orders.forEach(order => {
        const date = order.orderDate.toDate();
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toISOString().split('T')[0];

        if (!weeks[weekKey]) {
          weeks[weekKey] = 0;
        }
        weeks[weekKey] += order.totalAmount;
      });

      const weekLabels = Object.keys(weeks).sort();
      const weekData = weekLabels.map(key => weeks[key]);
      setWeeklyRevenue({ labels: weekLabels, data: weekData });

      // Product Sales
      const products = {};
      orders.forEach(order => {
        order.items.forEach(item => {
          if (!products[item.name]) {
            products[item.name] = 0;
          }
          products[item.name] += item.quantity;
        });
      });

      const productLabels = Object.keys(products);
      const productData = productLabels.map(key => products[key]);
      setProductSales({ labels: productLabels, data: productData });

      // Category Sales
      const categories = { burger: 0, pizza: 0 };
      orders.forEach(order => {
        order.items.forEach(item => {
          if (item.category) {
            categories[item.category] = (categories[item.category] || 0) + (item.price * item.quantity);
          }
        });
      });

      setCategorySales({
        labels: ['Burgers', 'Pizzas'],
        data: [categories.burger, categories.pizza],
      });

      // Time of Day
      const timeRanges = {
        'Morning (6-11)': 0,
        'Afternoon (12-17)': 0,
        'Evening (18-22)': 0,
        'Night (23-5)': 0,
      };

      orders.forEach(order => {
        const hour = order.orderTime;
        if (hour >= 6 && hour <= 11) timeRanges['Morning (6-11)']++;
        else if (hour >= 12 && hour <= 17) timeRanges['Afternoon (12-17)']++;
        else if (hour >= 18 && hour <= 22) timeRanges['Evening (18-22)']++;
        else timeRanges['Night (23-5)']++;
      });

      setTimeSales({
        labels: Object.keys(timeRanges),
        data: Object.values(timeRanges),
      });
    } catch (error) {
      console.error('[loadAnalyticsData]', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics & Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Revenue */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Sales Revenue</h2>
          {weeklyRevenue.data.length > 0 ? (
            <BarChart
              data={weeklyRevenue.data}
              labels={weeklyRevenue.labels}
              title="Revenue by Week"
            />
          ) : (
            <p className="text-gray-600 text-center py-8">Not enough data</p>
          )}
        </div>

        {/* Product Sales */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Sales Comparison</h2>
          {productSales.data.length > 0 ? (
            <BarChart
              data={productSales.data}
              labels={productSales.labels}
              title="Quantity Sold by Product"
            />
          ) : (
            <p className="text-gray-600 text-center py-8">Not enough data</p>
          )}
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Category Sales Distribution</h2>
          {categorySales.data.some(d => d > 0) ? (
            <PieChart
              data={categorySales.data}
              labels={categorySales.labels}
              title="Revenue by Category"
            />
          ) : (
            <p className="text-gray-600 text-center py-8">Not enough data</p>
          )}
        </div>

        {/* Time of Day */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Orders by Time of Day</h2>
          {timeSales.data.some(d => d > 0) ? (
            <Histogram
              data={timeSales.data}
              labels={timeSales.labels}
              title="Orders by Time Range"
            />
          ) : (
            <p className="text-gray-600 text-center py-8">Not enough data</p>
          )}
        </div>
      </div>
    </div>
  );
}
