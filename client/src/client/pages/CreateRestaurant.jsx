import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import Layout from '../components/layout/Layout';

const CreateRestaurant = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    ownerId: '',
    name: '',
    arabicName: '',
    address: '',
    phone: '',
    email: '',
    openingTime: '',
    closingTime: '',
    logoUrl: null,
  });
  const [isAllowed, setIsAllowed] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkOwnerStatus = async () => {
      try {
        const clientData = Cookies.get('clientData');
        if (!clientData) {
          setIsAllowed(false);
          setChecking(false);
          return;
        }

        const parsedClientData = JSON.parse(clientData);
        const userId = parsedClientData?._id;
        
        if (!userId) {
          setIsAllowed(false);
          setChecking(false);
          return;
        }

        const token = Cookies.get('clientToken');
        if (!token) {
          setIsAllowed(false);
          setChecking(false);
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/find/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setIsAllowed(data.role === 'restaurant_owner' && data.isVerified === true);
      } catch (error) {
        console.error('Error checking owner status:', error);
        setIsAllowed(false);
      } finally {
        setChecking(false);
      }
    };

    checkOwnerStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const clientData = Cookies.get('clientData');
      if (!clientData) {
        throw new Error('No client data found');
      }

      const parsedClientData = JSON.parse(clientData);
      const userId = parsedClientData?._id;
      
      if (!userId) {
        throw new Error('No user ID found');
      }

      const token = Cookies.get('clientToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'logoUrl' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else if (key !== 'logoUrl') {
          formDataToSend.append(key, formData[key]);
        }
      });

      formDataToSend.append('ownerId', userId);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants/create/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create restaurant');
      }

      if (data.success) {
        Cookies.set('restaurantId', data.restaurantId);
        toast.success('Restaurant created successfully!');
        navigate('/client/restaurant-details');
      } else {
        throw new Error(data.message || 'Failed to create restaurant');
      }
    } catch (error) {
      console.error('Error creating restaurant:', error);
      toast.error(error.message || 'Failed to create restaurant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (checking) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!isAllowed) {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Not Allowed</h2>
            <p className="text-gray-600 mb-6">Only accepted restaurant owners can create a restaurant. Please wait for your account to be verified or contact support.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Restaurant</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Restaurant Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Arabic Name:</label>
              <input
                type="text"
                name="arabicName"
                value={formData.arabicName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
            <div></div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opening Time:</label>
              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Closing Time:</label>
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Logo:</label>
              <input
                type="file"
                name="logoUrl"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/client/restaurant-details')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isLoading ? 'Creating...' : 'Create Restaurant'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateRestaurant;
