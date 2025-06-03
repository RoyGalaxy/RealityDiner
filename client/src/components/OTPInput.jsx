import React, { useEffect, useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const OTPInput = ({onVerify}) => {
  const [otp, setOtp] = useState("")

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp);
    } else {
      alert("Enter a 6-digit OTP");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 py-10 bg-white shadow-lg rounded-lg w-full sm:w-4/5 md:max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-6">Enter OTP</h2>
      
        <InputOTP value={otp} onChange={setOtp} containerClassName="justify-center" maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="mr-2 h-10 bg-white-light w-10" />
            <InputOTPSlot index={1} className="mr-2 h-10 bg-white-light w-10" />
            <InputOTPSlot index={2} className="mr-2 h-10 bg-white-light w-10" />
            <InputOTPSlot index={3} className="mr-2 h-10 bg-white-light w-10" />
            <InputOTPSlot index={4} className="mr-2 h-10 bg-white-light w-10" />
            <InputOTPSlot index={5} className="mr-2 h-10 bg-white-light w-10" />
          </InputOTPGroup>
        </InputOTP>

        <button
        onClick={() => handleVerify(otp)}
        className="bg-primary text-white py-3 text-lg font-bold rounded-md mt-4"
      >
        Login
      </button>
      
    </div>
  )
}

export default OTPInput