import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    arabicName: '',
    description: '',
    arabicDescription: '',
    image: null,
    category: '',
    arabicCategory: '',
    price: '',
    model3d: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Append text fields
      formData.append('name', product.name);
      formData.append('arabicName', product.arabicName);
      formData.append('description', product.description);
      formData.append('arabicDescription', product.arabicDescription);
      formData.append('category', product.category);
      formData.append('arabicCategory', product.arabicCategory);
      formData.append('price', product.price);
      const restaurantId = (Cookies.get('restaurantId'));
      formData.append('restaurantId', restaurantId);

      // Append files if they exist
      if (product.image) {
        formData.append('image', product.image);
      }
      if (product.model3d) {
        formData.append('model3d', product.model3d);
      }
      
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${Cookies.get('clientToken')}`
        },
      });

      if (response.status === 200) {
        toast.success('Product added successfully!');
        navigate('/client/menu');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // TODO: Add error handling UI
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
    }
  };

  const handleModelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, model3d: file });
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Arabic Name:</label>
              <input
                type="text"
                name="arabicName"
                value={product.arabicName}
                onChange={handleChange}
                required
                placeholder="Enter Arabic name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Description:</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                placeholder="Enter product description"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Arabic Description:</label>
              <textarea
                name="arabicDescription"
                value={product.arabicDescription}
                onChange={handleChange}
                required
                placeholder="Enter Arabic description"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Image:</label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageUpload}
                  required
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Choose File
                </label>
                <span className="ml-3 text-sm text-gray-500" id="file-name">
                  {product.image ? product.image.name : 'No file chosen'}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category:</label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                placeholder="Enter product category"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Arabic Category:</label>
              <input
                type="text"
                name="arabicCategory"
                value={product.arabicCategory}
                onChange={handleChange}
                required
                placeholder="Enter Arabic category"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price:</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                placeholder="Enter product price"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">3D Model File:</label>
            <div className="flex items-center">
              <input
                type="file"
                name="model3d"
                onChange={handleModelUpload}
                required
                className="hidden"
                id="model-upload"
              />
              <label
                htmlFor="model-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Choose 3D Model
              </label>
              <span className="ml-3 text-sm text-gray-500" id="model-file-name">
                {product.model3d ? product.model3d.name : 'No file chosen'}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto flex justify-center py-3 px-8 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Add Product
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct; 