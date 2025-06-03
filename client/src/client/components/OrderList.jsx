import React from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ orders, onAccept, onReject }) => {
  return (
    <ul className="space-y-2 bg-white p-4 rounded-lg shadow-md">
      {orders && orders.map((order) => (
        <OrderItem key={order._id} order={order} onAccept={() => onAccept(order._id)} onReject={() => onReject(order._id)} />
      ))}
    </ul>
  );
};

export default OrderList; 