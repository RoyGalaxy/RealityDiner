import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    role: 'restauant_owner', // Default role as per schema
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const isFormValid = () => {
    const { name, phone, email, password, confirmPassword } = userInfo;
    return (
      name &&
      phone &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/client/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        });

        if (response.ok) {
          toast.success('Registration successful! Please login.');
          navigate('/client/login');
        } else {
          const errorData = await response.json();
          console.error('Registration error:', errorData);
          toast.error('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        toast.error('Registration failed. Please try again.');
      }
    } else {
      console.error('Form is not valid');
      toast.error('Please fill all fields correctly');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-10 text-center">User Registration</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Already have an account?{' '}
          <Link to="/client/login" className="text-indigo-600 hover:text-indigo-800">
            Login here
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='flex flex-col gap-4'>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label className="block text-sm font-medium text-gray-700">Phone:</label>
            <PhoneInput
              buttonStyle={{border: 'none', background: 'transparent'}}
              country={"ae"} // Default country (UAE)
              value={userInfo.phone}
              onChange={(phone) => setUserInfo({ ...userInfo, phone })}
              inputStyle={{
                width: "100%",
                fontSize: "16px",
                padding: "10px 20px 10px 50px", // Added horizontal padding to separate from country code selector
                borderRadius: "6px",
                outline: 'none',
                border: 'none',
                background: 'transparent'
              }}
              containerClass="py-2 px-4 border border-[#aaa] rounded-md"
              dropdownStyle={{ fontSize: "16px" }}
            />
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={userInfo.password}
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              value={userInfo.confirmPassword}
              onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button 
              type="submit" 
              className={`w-full flex justify-center items-center py-3 px-6 rounded-xl text-sm font-bold text-white ${isFormValid() ? 'bg-red-400' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isFormValid()}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 