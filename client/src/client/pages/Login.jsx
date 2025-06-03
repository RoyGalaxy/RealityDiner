import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const ClientLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/client/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Important for cookies
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in cookies
        Cookies.set('clientToken', data.accessToken, {
          secure: true, // Only sent over HTTPS
          sameSite: 'strict', // Prevents CSRF
          expires: 7, // Cookie expires in 7 days
        });

        Cookies.set('clientData', JSON.stringify({
          _id: data._id,
          email: data.email,
          name: data.name,
          role: data.role
        }), {
          secure: true,
          sameSite: 'strict',
          expires: 7,
        });

        toast.success('Login successful!');
        navigate('/client/dashboard');
      } else {
        toast.error(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Client Login</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Don't have an account?{' '}
          <Link to="/client/register" className="text-indigo-600 hover:text-indigo-800">
            Register here
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          <Link to="/client/forgot-password" className="text-indigo-600 hover:text-indigo-800">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ClientLogin; 