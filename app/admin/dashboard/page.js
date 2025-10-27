'use client';

import { useState, useEffect } from 'react';
import { getOrders, getTopUserOfMonth } from '../../../lib/firestore';
import { formatCurrency } from '../../../utils/formatters';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    activeCustomers: 0,
  });
  const [topUser, setTopUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayOrders = await getOrders({
        startDate: today,
      });

      const todayRevenue = todayOrders.reduce((sum, order) => {
        return order.paymentStatus === 'completed' ? sum + order.totalAmount : sum;
      }, 0);

      const topUserData = await getTopUserOfMonth();

      setStats({
        todayOrders: todayOrders.length,
        todayRevenue,
        activeCustomers: new Set(todayOrders.map(o => o.userId)).size,
      });

      setTopUser(topUserData.topBySpending);
    } catch (error) {
      console.error('[loadDashboardData]', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Today&apos;s Orders</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.todayOrders}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Today&apos;s Revenue</h3>
              <p className="text-3xl font-bold text-primary-600">
                {formatCurrency(stats.todayRevenue)}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Active Customers Today</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.activeCustomers}</p>
            </div>
          </div>

          {/* Top User of the Month */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Top User of the Month</h2>
            {topUser ? (
              <div className="border-l-4 border-primary-600 pl-4">
                <p className="text-lg font-semibold text-gray-900">{topUser.userName}</p>
                <p className="text-sm text-gray-600 mb-2">{topUser.userEmail}</p>
                <div className="flex space-x-6">
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="text-xl font-bold text-primary-600">
                      {formatCurrency(topUser.totalSpent)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Orders Placed</p>
                    <p className="text-xl font-bold text-gray-900">{topUser.orderCount}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No orders this month yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
