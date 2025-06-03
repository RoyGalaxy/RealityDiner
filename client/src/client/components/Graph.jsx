import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', sales: 400, orders: 240, revenue: 2400 },
  { name: 'Feb', sales: 300, orders: 139, revenue: 1390 },
  { name: 'Mar', sales: 200, orders: 980, revenue: 9800 },
  { name: 'Apr', sales: 278, orders: 390, revenue: 3900 },
  { name: 'May', sales: 189, orders: 480, revenue: 4800 },
  { name: 'Jun', sales: 239, orders: 380, revenue: 3800 },
];

const Graph = ({ title }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
        <Line type="monotone" dataKey="revenue" stroke="#ffc658" />
      </LineChart>
    </div>
  );
};

export default Graph; 