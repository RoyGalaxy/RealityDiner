import React, { useContext, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import AnimatedContent from '../components/reactbits/AnimatedComponent'
import CartButton from '../components/CartButton'
import { FiBox } from 'react-icons/fi'
import Layout from './Layout'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, currency } = useContext(ShopContext)
  const product = useMemo(() => getProductById(id))
  const [descriptionVisible, setDescriptionVisible] = useState(true)

  return (
    <Layout>
      <div className='py-20 px-4 grid md:grid-cols-2'>
        {/* Product Image */}
        <AnimatedContent
          distance={50}
          reverse={false}
          config={{ tension: 120, friction: 20 }}
          initialOpacity={0.2}
          animateOpacity
          scale={0.8}
          threshold={0.5}
        >
          {/* AR Button */}
          <button
            onClick={() => navigate(`/product/ar/${id}`)}
            className="flex items-center gap-2 absolute top-4 left-4 text-lg text-white-soft py-2 px-5 bg-primary rounded-lg border-none cursor-pointer"
          >
            {/* <FiBox fontSize={20} /> */}
            <FiBox />
            View in 3D
          </button>
          <img src={product && product?.image} className='w-full aspect-square rounded-xl shadow-lg bg-slate-300 mb-8' alt="" />
        </AnimatedContent>
        {/* Product Info */}
        <div className='px-3 md:p-12'>
          <h1 className='text-xl font-bold text-ellipsis line-clamp-2 mb-3'>{product?.name}</h1>
          <p className='text-[#111] text-md font-semibold mb-4'>{currency} {product?.price || '0'}</p>
          <CartButton itemId={id} />
          <p onClick={() => setDescriptionVisible(!descriptionVisible)} className='text-lg text-black font-semibold mb-2'>{!descriptionVisible ? "Show Description" : "Hide Description"}: </p>
          <p>{descriptionVisible ? product?.description : ""}</p>
        </div>
      </div>
    </Layout>
  )
}

export default Product