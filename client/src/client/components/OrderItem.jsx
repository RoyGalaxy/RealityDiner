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
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-gray-800 text-lg font-semibold">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'accepted' ? 'bg-green-100 text-green-800' :
              order.status === 'rejected' ? 'bg-red-100 text-red-800' :
              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onAccept(order.id)}
              disabled={order.status === 'accepted'}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 
                ${order.status === 'accepted' 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-200 active:transform active:scale-95'
                }`}
            >
              Accept
            </button>
            <button
              onClick={() => onReject(order.id)}
              disabled={order.status === 'rejected'}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200
                ${order.status === 'rejected'
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-200 active:transform active:scale-95'
                }`}
            >
              Reject
            </button>
          </div>
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