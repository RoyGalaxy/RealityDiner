import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/admins`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('adminToken') || ''}`
          }
        });
        const data = await response.json();
        setAdmins(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch admins');
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleAdminClick = (adminId) => {
    navigate(`/admin/admins/${adminId}`);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-8 flex items-center justify-center">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Restaurant Owners</h1>
          <p className="text-gray-400 mt-2">Manage and view all restaurant administrators</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <div 
              key={admin._id} 
              className="bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleAdminClick(admin._id)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-blue-500 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{admin.name}</h2>
                  <p className="text-gray-400 text-sm">{admin.email}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-blue-400 font-medium">{admin.restaurantName}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${admin.isVerified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {admin.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                  {!admin.isVerified && (
                    <>
                      <button
                        className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/admins/${admin._id}/accept`, {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${Cookies.get('adminToken') || ''}`
                              }
                            });
                            if (!response.ok) throw new Error('Failed to accept admin');
                            // Refresh list
                            setAdmins((prev) => prev.map(a => a._id === admin._id ? { ...a, isVerified: true } : a));
                          } catch (err) {
                            alert('Error accepting admin');
                          }
                        }}
                      >Accept</button>
                    { admin.isVerified !== false && <button
                        className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/admins/${admin._id}/reject`, {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${Cookies.get('adminToken') || ''}`
                              }
                            });
                            if (!response.ok) throw new Error('Failed to reject admin');
                            else toast
                            // Refresh list
                            setAdmins((prev) => prev.map(a => a._id === admin._id ? { ...a, isVerified: false } : a));
                          } catch (err) {
                            alert('Error rejecting admin');
                          }
                        }}
                      >Reject</button>}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admins;
