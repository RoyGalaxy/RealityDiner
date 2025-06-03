import React from 'react'
import CategoryTiles from '../components/CategoryTiles'
import Layout from './Layout'

const Categories = () => {
  return (
    <Layout>
      <div className='py-20 px-4'>
        <CategoryTiles />
      </div>
    </Layout>
  )
}

export default Categories