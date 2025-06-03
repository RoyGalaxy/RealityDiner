import React, { useContext, useMemo } from 'react'
import ModelViewer from '../components/ModelViewer'
import { useNavigate, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import Layout from './Layout';

const AR = () => {
  const { id } = useParams();
  const { getProductById } = useContext(ShopContext);
  const navigate = useNavigate()

  const product = useMemo(() => getProductById(id))
  console.log(product)


  return (
    <Layout>
      <div className='py-20 px-4 h-screen w-full'>
        {product && <ModelViewer src={`${import.meta.env.VITE_BACKEND_URL}${product?.model3d}`} />}
      </div>
    </Layout>
  )
}

export default AR