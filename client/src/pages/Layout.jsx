import NavBar from '@/components/NavBar'
import React, { useContext, useEffect } from 'react'
import { ShopContext } from '@/context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({children}) => {

  const { restaurantId } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!restaurantId) {
      navigate('/home')
    }
  }, [restaurantId])

  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  )
}

export default Layout