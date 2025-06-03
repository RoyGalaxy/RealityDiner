import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const MobileInput = ({ onNext }) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (phone.length > 8) {
      onNext(phone);
    } else {
      alert("Enter a valid mobile number");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 py-10 bg-white shadow-lg rounded-lg w-full sm:w-4/5 md:max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-6">Enter Mobile Number</h2>
      <PhoneInput
        buttonStyle={{border: 'none', background: 'transparent'}}
        country={"ae"} // Default country (UAE)
        value={phone}
        onChange={setPhone}
        inputStyle={{
          width: "100%",
          fontSize: "16px",
          padding: "10px 50px",
          borderRadius: "6px",
          outline: 'none',
          border: 'none',
          background: 'transparent'
        }}
        containerClass="py-2 px-4 border border-[#aaa] rounded-md"
        dropdownStyle={{ fontSize: "16px" }}
        
      />
      <button
        onClick={handleSubmit}
        className="bg-primary text-white py-3 text-lg font-bold rounded-md mt-4"
      >
        Send OTP
      </button>
    </div>
  );
};

export default MobileInput;
