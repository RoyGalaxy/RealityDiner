import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'
import { ShopContext } from '@/context/ShopContext';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const { setRestaurant } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants/`);
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleClick = (restaurant) => {
    setRestaurant(restaurant);
    navigate(`/categories/`);
  }

  return (
    <Layout>
      <div className='pt-20 px-4 flex flex-col gap-6'>
        <h2 className='text-2xl font-bold'>Select A Restaurant</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start'>
          {restaurants.map((restaurant) => (
            <div key={restaurant._id} className='border border-gray-300 rounded-lg shadow-md h-full p-6 flex flex-row items-center transition-transform transform hover:scale-105'>
              <img src={`${import.meta.env.VITE_BACKEND_URL}${restaurant.logoUrl}`} alt={restaurant.name} className='w-32 h-32 object-cover rounded-lg mr-4' />
              <div className='flex flex-col items-start h-full p-4 justify-between'>
                <h3 className='text-xl font-semibold text-gray-800 mb-1'>{restaurant.name}</h3>
                <div onClick={() => handleClick(restaurant)} className='mt-2'>
                  <button className='bg-primary text-white rounded-lg px-5 py-2 transition-colors duration-300 hover:bg-primary-dark'>View Menu</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home