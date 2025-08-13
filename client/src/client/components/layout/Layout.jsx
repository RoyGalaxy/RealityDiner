import React, { useContext, useEffect } from 'react';
import Sidebar from './Sidebar';
import Cookies from 'js-cookie';
import { ShopContext } from '@/context/ShopContext';

const Layout = ({ children }) => {

  const { restaurantId, setRestaurant, isLoading } = useContext(ShopContext);

  const fetchRestaurant = async (clientId, clientToken) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants/client/${clientId}`, {
      headers: {
        'Authorization': `Bearer ${clientToken}`
      }
    });
    const data = await response.json();
    setRestaurant(data._id);
  }

  useEffect(() => {
    if(!restaurantId) {
      const clientData = JSON.parse(Cookies.get('clientData'));
      const clientToken = Cookies.get('clientToken');
      fetchRestaurant(clientData._id, clientToken);
    }
  }, [])

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 ml-16">
        {children}
      </main>
    </div>
  );
};

export default Layout; 