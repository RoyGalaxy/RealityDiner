import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import OrderList from '../components/OrderList';
import Graph from '../components/Graph';
import Cookies from 'js-cookie';
import { ShopContext } from '@/context/ShopContext';

const ClientDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { restaurantId } = useContext(ShopContext);

  useEffect(() => {
    if (!restaurantId) return;
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${restaurantId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Cookies.get('clientToken')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [restaurantId]);


  const handleAccept = (orderId) => {
    // Logic to accept order
    console.log(`Order ${orderId} accepted`);
  };

  const handleReject = (orderId) => {
    // Logic to reject order
    console.log(`Order ${orderId} rejected`);
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">New Orders</h3>
          {orders && orders.length > 0 && (
            <OrderList orders={orders} onAccept={handleAccept} onReject={handleReject} />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Graph title="Sales Graph" description="This graph shows the total sales over time." />
          <Graph title="Orders Graph" description="This graph displays the number of orders placed." />
          <Graph title="Revenue" description="This graph represents the revenue generated." />
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard; 
