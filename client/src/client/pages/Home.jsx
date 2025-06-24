import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import OrderList from '../components/OrderList';
import Orders from './Orders';
import Graph from '../components/Graph';
import Cookies from 'js-cookie';
import { ShopContext } from '@/context/ShopContext';

const ClientDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { restaurantId } = useContext(ShopContext);
  const token = Cookies.get('clientToken');
  const [orderData, setOrderData] = useState({});

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${restaurantId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/metrics/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error('Failed to fetch metrics');
      }
      setOrderData(data.data);
    } catch (err) {
      console.error('Error fetching metrics:', err);
    }
  }

  useEffect(() => {
    if (!restaurantId) return;

    fetchOrders();
    fetchMetrics();
  }, [restaurantId]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      const jsonRes = await response.json();
      if (jsonRes.success) {
        console.log('Order status updated successfully');
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };


  const handleAccept = (orderId) => {
    // Logic to accept order
    updateOrderStatus(orderId, 'accepted');
  };

  const handleReject = (orderId) => {
    // Logic to reject order
    updateOrderStatus(orderId, 'rejected');
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
          <Graph title="Revenue" description="This graph shows the total sales over time." data={orderData}/>
          <Graph title="Orders" description="This graph displays the number of orders placed." data={orderData}/>
        </div>
        <div className="mt-6">
          <Graph />
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
