import React from 'react'
import ProductTile from '../components/ProductTile'
import Layout from './Layout'

const CategoryProducts = () => {
  return (
    <Layout>
      <div className='py-20 px-4'>
        <ProductTile />
      </div>
    </Layout>
  )
}

export default CategoryProducts