import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    arabicName: '',
    description: '',
    arabicDescription: '',
    image: null,
    category: '',
    arabicCategory: '',
    price: '',
    model3d: null
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }

        const data = await response.json();
        setProductData({
          name: data.name,
          arabicName: data.arabicName,
          description: data.description,
          arabicDescription: data.arabicDescription,
          image: null, // Assuming image is handled separately
          category: data.category,
          arabicCategory: data.arabicCategory,
          price: data.price,
          model3d: null // Assuming model3d is handled separately
        });
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProduct = async () => {
      try {
        const formData = new FormData();
        
        // Append text fields
        formData.append('name', productData.name);
        formData.append('arabicName', productData.arabicName);
        formData.append('description', productData.description);
        formData.append('arabicDescription', productData.arabicDescription);
        formData.append('category', productData.category);
        formData.append('arabicCategory', productData.arabicCategory);
        formData.append('price', productData.price);
        
        // Append files if they exist
        if (productData.image) {
          formData.append('image', productData.image);
        }
        if (productData.model3d) {
          formData.append('model3d', productData.model3d);
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${Cookies.get('clientToken')}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to update product');
        }

        const data = await response.json();
        if (data.success) {
          toast.success('Product updated successfully!');
        } else {
          toast.error(data.message || 'Failed to update product.');
        }
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('An error occurred while updating the product.');
      }
    };

    await updateProduct();
    
    navigate('/client/menu');
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Product</h2>
          <button
            onClick={() => navigate('/client/menu')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name (English)</label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 mb-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name (Arabic)</label>
                  <input
                    type="text"
                    name="arabicName"
                    value={productData.arabicName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 mb-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description (English)</label>
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 mb-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description (Arabic)</label>
                  <textarea
                    name="arabicDescription"
                    value={productData.arabicDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 mb-4"
                  />
                </div>
              </div>
            </div>

            {/* Category and Price */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Category and Price</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category (English)</label>
                  <input
                    type="text"
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 mb-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category (Arabic)</label>
                  <input
                    type="text"
                    name="arabicCategory"
                    value={productData.arabicCategory}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 mb-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (AED)</label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 mb-4"
                  />
                </div>
              </div>
            </div>

            {/* Images and 3D Model */}
            <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-500 border border-gray-300
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 mb-4 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">3D Model</label>
                  <input
                    type="file"
                    name="model3d"
                    onChange={handleInputChange}
                    accept=".glb,.gltf"
                    className="mt-1 block w-full text-sm text-gray-500 border border-gray-300
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 mb-4 p-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProduct; 