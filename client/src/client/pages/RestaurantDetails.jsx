import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import Cookies from 'js-cookie';

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ownerId: '', // Added ownerId
    name: '',
    arabicName: '',
    address: '',
    phone: '',
    email: '', // Added email
    openingTime: '',
    closingTime: '',
    logoUrl: null,
  });

  useEffect(() => {
    fetchRestaurantDetails();
  }, []);

  const fetchRestaurantDetails = async () => {
    try {
      const clientData = JSON.parse(Cookies.get('clientData'));
      const userId = clientData ? clientData._id : null;
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants/client/${userId}`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('clientToken')}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setRestaurant(data);
        setFormData(data);
      } else if (response.status === 404) {
        // Restaurant not found, show create button
        setRestaurant(null);
      } else {
        toast.error('Failed to fetch restaurant details');
      }
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      toast.error('Failed to fetch restaurant details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'logoUrl' || key === 'coverImage') {
          if (formData[key]) {
            formDataToSend.append(key, formData[key]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${Cookies.get('clientToken')}`,
        },
        body: formDataToSend,
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setRestaurant(data);
        setIsEditing(false);
        toast.success('Restaurant details updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update restaurant details');
      }
    } catch (error) {
      console.error('Error updating restaurant:', error);
      toast.error('Failed to update restaurant details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!restaurant) {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">No Restaurant Found</h2>
            <p className="text-gray-600 mb-6">You haven't created a restaurant yet. Create one to get started!</p>
            <button
              onClick={() => navigate('/client/create-restaurant')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Restaurant
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Restaurant Details</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isEditing ? 'Cancel Editing' : 'Edit Details'}
          </button>
        </div>

        {isEditing ? (
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                />
              </div>
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo:</label>
                <input
                  type="file"
                  name="logoUrl"
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
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
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-lg font-bold text-gray-900">Name</dt>
                    <dd className="mt-1 text-md text-gray-900">{restaurant.name}</dd>
                  </div>
                  <div>
                    <dt className="text-lg font-bold text-gray-900">Arabic Name</dt>
                    <dd className="mt-1 text-md text-gray-900">{restaurant.arabicName}</dd>
                  </div>
                  <div>
                    <dt className="text-md font-bold text-gray-500">Category</dt>
                    <dd className="mt-1 text-md text-gray-900">{restaurant.category}</dd>
                  </div>
                  <div>
                    <dt className="text-lg font-bold text-gray-900">Arabic Category</dt>
                    <dd className="mt-1 text-md text-gray-900">{restaurant.arabicCategory}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-lg font-bold text-gray-900">Address</dt>
                    <dd className="mt-1 text-md text-gray-900">{restaurant.address}</dd>
                  </div>
                  <div>
                    <dt className="text-lg font-bold text-gray-900">Phone</dt>
                    <dd className="mt-1 text-md text-gray-900">{restaurant.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-lg font-bold text-gray-900">Opening Hours</dt>
                    <dd className="mt-1 text-md text-gray-900">
                      {restaurant.openingTime} - {restaurant.closingTime}
                    </dd>
                  </div>
                </dl>
              </div>

              {restaurant.logoUrl && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Logo</h3>
                  <img
                    src={restaurant?.logoUrl && `${import.meta.env.VITE_BACKEND_URL}${restaurant.logoUrl}`}
                    alt="Restaurant Logo"
                    className="mt-4 h-32 w-32 object-contain"
                  />
                </div>
              )}

              {restaurant.coverImage && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Cover Image</h3>
                  <img
                    src={restaurant.coverImage}
                    alt="Restaurant Cover"
                    className="mt-4 h-48 w-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RestaurantDetails; 