import React, { useContext, useEffect, useMemo, useState } from 'react'
import AnimatedContent from './reactbits/AnimatedComponent'
import { ShopContext } from '../context/ShopContext'
import { useNavigate, useParams } from 'react-router-dom'
import CartButton from './CartButton'
import { FiBox } from 'react-icons/fi'

const ProductTile = () => {
  const { getProductsByCategory, currency } = useContext(ShopContext)
  const navigate = useNavigate()
  const { category } = useParams()
  const products = useMemo(() => getProductsByCategory(category), [category, getProductsByCategory])

  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2 transition">
      {/* First Component - Full Width */}

      <AnimatedContent
        distance={50}
        reverse={false}
        config={{ tension: 100, friction: 20 }}
        initialOpacity={0.2}
        animateOpacity
        scale={0.8}
        threshold={0.8}
      >
        <div
          onClick={() => navigate(`/product/${products[0]._id}`)}
          style={{
            backgroundImage: products[0] ? `url('${products[0]?.image}')` : ''
          }}
          className={`bg-cover bg-center bg-slate-300 aspect-square flex items-end text-white text-center rounded-lg shadow-lg mb-2 transition-transform duration-300 hover:scale-[1.02] cursor-pointer`}
        >
          <div onClick={(e) => { e.stopPropagation(); navigate(`/product/ar/${products[0]._id}`) }} className='absolute top-4 right-4 w-fit h-fit p-2 rounded-full bg-white-light hover:bg-white transition-colors'>
            <FiBox color='black' fontSize={20} fontWeight={600} />
          </div>
          <CartButton itemId={products[0] ? products[0]._id : null} componentStyle={{ position: 'absolute', top: '16px', left: '16px' }} />
          <div className='flex flex-col w-full bg-black bg-opacity-50 p-4 pt-2'>
            <h1 className="text-xl font-bold text-white text-left text-ellipsis line-clamp-2">{products[0]?.name}</h1>
            <h1 className='text-lg text-white-soft text-left'>{currency} {products[0]?.price}</h1>
          </div>
        </div>
      </AnimatedContent>

      {/* Grid Container */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-2 gap-2"> */}
        {/* Grid Items */}
        {
          products.map((product, index) => index > 0 && (
            <AnimatedContent
              distance={50}
              reverse={false}
              config={{ tension: 120, friction: 20 }}
              initialOpacity={0.2}
              animateOpacity
              scale={0.8}
              threshold={0.8}
              key={index}
            >
              <div
                onClick={() => navigate(`/product/${product?._id}`)}
                style={{
                  backgroundImage: `url('${product?.image.replace("w800-h800","w400-h400")}')`
                }}
                className={`bg-cover bg-center bg-slate-300 aspect-square flex items-end text-white text-center rounded-lg shadow-lg mb-2 transition-transform duration-300 hover:scale-[1.02] cursor-pointer`}
              >
                <CartButton  itemId={product ? product._id : null} text={'Add +'} componentStyle={{ position: 'absolute', top: '16px', left: '16px' }} />
                <div onClick={(e) => { e.stopPropagation(); navigate(`/product/ar/${product._id}`) }} className='absolute top-4 right-4 w-fit h-fit p-2 rounded-full bg-white-light hover:bg-white transition-colors'>
                  <FiBox color='black' fontSize={20} fontWeight={600} />
                </div>
                <div className='flex flex-col w-full bg-black bg-opacity-50 p-4 pt-2'>
                  <h1 className="text-lg font-bold text-white text-left text-ellipsis line-clamp-1">{product?.name}</h1>
                  <h1 className='text-md text-white-soft text-left'>{currency} {product?.price}</h1>
                </div>
              </div>
            </AnimatedContent>
          ))
        }
      {/* </div> */}
    </div>
  )
}

export default ProductTile