import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const AdminDetails = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/find/${id}`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('adminToken')}`
          }
        });
        if (!response.ok) throw new Error("Failed to fetch admin details");
        const data = await response.json();
        setAdmin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-6">
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );

  if (!admin) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800/50 rounded-lg p-6">
        <p className="text-gray-400">No admin found.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="mb-6 border-b border-gray-700 pb-4">
            <h1 className="text-3xl font-bold text-white">
              Admin Details
            </h1>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">ID</p>
              <p className="text-white font-medium">{admin._id}</p>
            </div>
            
            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Name</p>
              <p className="text-white font-medium">{admin.name}</p>
            </div>
            
            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p className="text-white font-medium">{admin.email}</p>
            </div>

            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Phone</p>
              <p className="text-white font-medium">{`+${admin.phone}` || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;