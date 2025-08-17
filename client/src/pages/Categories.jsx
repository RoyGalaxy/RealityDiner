import React, { useContext, useEffect } from 'react'
import CategoryTiles from '../components/CategoryTiles'
import Layout from './Layout'
import { useParams } from 'react-router-dom'
import { ShopContext } from '@/context/ShopContext'
import { set } from 'react-hook-form'

const Categories = () => {
  const { restaurantId } = useParams()
  const { setRestaurant } = useContext(ShopContext);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants/restaurant/${restaurantId}`);
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurant();
  }, [restaurantId])

  return (
    <Layout>
      <div className='py-20 px-4'>
        <CategoryTiles />
      </div>
    </Layout>
  )
}

export default Categories