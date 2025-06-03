import {useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import { ShopContext } from '@/context/ShopContext';

const OrderItem = ({ order, onAccept, onReject }) => {
  const { currency } = useContext(ShopContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/find/${order.userId}`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('clientToken')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [order.userId]);

  
  return (
    <li className="p-6 bg-gradient-to-r from-white to-gray-100 rounded-xl shadow-md border border-gray-300 flex flex-col space-y-4">
      <div className="flex flex-col mb-4 gap-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <p className="text-gray-800 text-lg font-semibold">Address:</p>
            <p className="text-gray-600 text-lg">{order.address.addressLine1}</p>
            <p className="text-gray-600 text-lg">{order.address.addressLine2} ({order.address.postalCode})</p>
            <p className="text-gray-600 text-lg">{order.address.city}, {order.address.state}</p>
          </div>
          <div>
            <p className="text-gray-900 font-bold text-xl">Customer: {user && `+${user.phone}`}</p>
            <br />
            <p className="text-gray-800 text-lg font-semibold">Total: {currency} {order.amount}</p>
          </div>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => onAccept(order.id)}
            className="px-6 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-transform transform hover:scale-110 duration-200"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(order.id)}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-transform transform hover:scale-110 duration-200"
          >
            Reject
          </button>
        </div>
      </div>
      <details className="bg-gray-50 rounded-lg p-4 border border-gray-300">
        <summary className="cursor-pointer text-gray-800 font-semibold">Products Ordered</summary>
        <ul className="list-disc pl-8 mt-3">
          {order.items.map((item, index) => (
            <li key={index} className="text-gray-800 font-semibold mb-2">
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
};

export default OrderItem; 