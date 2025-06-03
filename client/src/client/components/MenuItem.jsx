import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const MenuItem = ({ product }) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/client/edit-product/${product._id}`);
  };

  const handleDelete = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${product._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Cookies.get('clientToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      toast.success('Product deleted successfully:', product._id);
    } catch (error) {
      toast.error('Error deleting product:');
      console.error('Error deleting product:', error);

    }

    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 relative">
        <div className={`flex justify-center items-center h-48 mb-4 ${product.image ? '' : 'bg-gray-200 animate-pulse'}`}>
          {product.image ? (
            <img src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} alt={product.name} className="w-40 h-40 object-cover rounded-md" />
          ) : (
            <span className="text-gray-500">Image not available</span>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-lg font-semibold text-green-600 mt-2">${product.price}</p>
        <p className="text-gray-500 mt-1">{product.description}</p>
        <div className="absolute top-4 right-4 flex space-x-3">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-800 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded"
          >
            <FiEdit size={22} />
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-600 hover:text-red-800 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded"
          >
            <FiTrash2 size={22} />
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
      />
    </>
  );
};

export default MenuItem; 