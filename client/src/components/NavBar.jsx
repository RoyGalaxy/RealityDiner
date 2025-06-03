import React, { useContext } from 'react'
import SplitText from './reactbits/SplitText'
import { FaAngleLeft } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { ShopContext } from '../context/ShopContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { getCartCount, setRestaurant } = useContext(ShopContext)

  const handleBack = () => {
    if (location.pathname === '/') {
      return;
    } else {
      navigate(-1)
    }
  }

  const handleLogoClick = () => {
    setRestaurant('');
    navigate('/');
  }

  return (
    <div className='z-10 fixed flex items-center justify-between px-4 w-full h-14 bg-white-soft shadow-lg'>
      <div onClick={handleBack} className='p-2 bg-white-light rounded-full text-[#111] active:bg-slate-400 active:text-white-light'>
        <FaAngleLeft fontSize={20} fontWeight={600} />
      </div>
      {/* Brand Logo or Text */}
      {/* <h1 className='text-xl text-[#111] font-bold tracking-wide'>Black Pepper</h1> */}
      <div onClick={handleLogoClick}>
        <SplitText
          text="Reality Diner"
          className="text-2xl font-semibold text-center"
          delay={100}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="0px"
        />
      </div>
      <Link to='/cart' className='relative p-1 rounded-full active:bg-slate-300'>
        <FaCartShopping className='text-black text-xl'/>
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-primary text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
      </Link>
    </div>
  )
}

export default NavBar