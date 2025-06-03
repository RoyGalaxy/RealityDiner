import React, { useContext } from 'react';
import Layout from '../components/layout/Layout';
import { ShopContext } from '../../context/ShopContext';
import MenuItem from '../components/MenuItem';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const { products, isLoading, error } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            onClick={() => navigate('/client/add-products')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add New Product
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products && products.map((product) => (
            <MenuItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Menu; 