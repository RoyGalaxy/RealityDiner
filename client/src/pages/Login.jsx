import { useState } from "react";
import MobileInput from "@/components/MobileInput";
import OTPInput from "@/components/OTPInput";
import { useNavigate } from "react-router-dom";
import Layout from './Layout';
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Login = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (otp) => {
    console.log(otp)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          phone: mobile,
          phoneOtp: otp
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        // Store user data in cookies
        Cookies.set('userToken', data.accessToken, {
          secure: true, // Only sent over HTTPS
          sameSite: 'strict', // Prevents CSRF
          expires: 7, // Cookie expires in 7 days
        });

        Cookies.set('userData', JSON.stringify({
          _id: data._id,
          phone: data.phone,
          role: data.role
        }), {
          secure: true,
          sameSite: 'strict',
          expires: 7,
        });

        toast.success('Login successful!');
        navigate('/checkout');
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Some error occurred")
    }
  }

  const handleNext = async (newMobile) => {
    setMobile(newMobile)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          mobile: newMobile
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      if(data.success){
        toast.success(data.message)
        setStep(2)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Some error occurred")
    }
  }

  

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-gray-100 py-20 px-6">
        {step === 1 ? (
          <MobileInput onNext={handleNext} />
        ) : (
          <OTPInput onVerify={handleLogin}/>
        )}
      </div>
    </Layout>
  );
};

export default Login;