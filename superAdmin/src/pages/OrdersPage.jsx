import React, { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Calendar } from '../components/ui/calendar';
import { format } from 'date-fns';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  useEffect(() => {
    // Fetch orders data
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // TODO: Implement API call to fetch orders
    // Placeholder data
    setOrders([
      {
        id: '1',
        customerName: 'John Doe',
        items: ['Burger', 'Fries'],
        total: 25.99,
        status: 'pending',
        date: new Date().toISOString(),
      },
      // Add more mock data as needed
    ]);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    // TODO: Implement status update logic
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <div className="flex gap-4">
          <Button variant="outline">Export Data</Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Calendar
          selected={dateRange}
          onSelect={setDateRange}
          mode="range"
          className="rounded-md border"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.items.join(', ')}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'completed' ? 'success' : 'default'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(order.date), 'PPP')}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default OrdersPage;