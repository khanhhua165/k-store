import { useState } from "react";
import { FiCheck } from "react-icons/fi";
const CheckoutPage = () => {
  const [isInInfo, setIsInInfo] = useState(true);
  return (
    <div className="flex flex-col w-3/4 mx-auto mt-24">
      <div className="flex items-end justify-between w-64 mx-auto space-x-3 xs:w-96">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-800 rounded-full">
            {isInInfo ? 1 : <FiCheck />}
          </div>
          <span>Shipping Information</span>
        </div>
        <div className="flex-grow h-3 border-t-2 border-gray-800"></div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-800 rounded-full">
            2
          </div>
          <span>Payment</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
