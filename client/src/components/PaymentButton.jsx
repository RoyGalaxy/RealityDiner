import React from "react";


const PaymentButton = () => {
  return (
    <button
      className="w-full bg-red-400 text-white py-2 px-4 rounded-md"
      // onClick={handleCheckout}
      // disabled={loading}
    >
      Pay with Stripe
    </button>
  );
};

export default PaymentButton;
