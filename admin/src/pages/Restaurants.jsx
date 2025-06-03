import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data = await response.json();
        setRestaurants(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* <Spinner className="h-12 w-12" /> */}
        Loading
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div 
            key={restaurant._id} 
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-700 cursor-pointer"
            onClick={() => navigate(`/admin/restaurants/${restaurant._id}`)}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={`${import.meta.env.VITE_BACKEND_URL}${restaurant.logoUrl}`} 
                alt={`${restaurant.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">{restaurant.name}</h2>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {restaurant.address}
                </p>
                <p className="text-gray-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  {restaurant.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {restaurants.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM9 7h6M9 11h6M9 15h6"/>
          </svg>
          <p className="mt-2 text-gray-400">No restaurants found.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurants;