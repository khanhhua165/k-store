import Link from "next/link";
import React from "react";
import { FaMedal } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { GiDirectionSigns } from "react-icons/gi";
const SecondSection = () => {
  return (
    <div className="flex flex-col pt-10 pb-10 bg-gray-200">
      <div className="flex items-center justify-center text-3xl font-bold text-blue-700 uppercase xs:text-4xl">
        What We Deliver
      </div>
      <div className="flex items-center justify-center w-11/12 max-w-3xl mx-auto mt-3 font-semibold text-center xs:text-lg md:w-full">
        When you purchase from us, you’re joining a community focused on caring
        about animals and our planet, improving livelihoods for farmers, and
        sharing better meals together.
      </div>
      <div className="flex flex-col items-center justify-center mt-4 space-y-4 md:flex-row md:space-x-10 md:space-y-0">
        <div className="flex flex-col items-center justify-center px-2 space-y-4 border border-gray-200 shadow-md bg-gray-50 w-72 h-72">
          <FaMedal className="text-4xl text-blue-700" />
          <span className="text-lg font-semibold text-center uppercase">
            High-quality Meat
          </span>
          <span className="text-center">
            100% grass-fed beef, free-range organic chicken, humanely raised
            pork, and wild-caught seafood.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center px-2 space-y-4 border border-gray-200 shadow-md w-72 h-72 bg-gray-50">
          <GiReceiveMoney className="text-4xl text-blue-700" />
          <span className="text-lg font-semibold text-center uppercase">
            Unbeatable Value
          </span>
          <span className="text-center">
            Get a range of high-quality cuts, from ground beef to filet mignon,
            at an amazing value.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center px-2 space-y-4 border border-gray-200 shadow-md w-72 h-72 bg-gray-50">
          <GiDirectionSigns className="text-4xl text-blue-700" />
          <span className="text-lg font-semibold text-center uppercase">
            Complete Flexibility
          </span>
          <span className="text-center">
            Shipping is always FREE, we deliver to your door on your schedule.
          </span>
        </div>
      </div>
      <Link href="/shop">
        <a className="flex items-center justify-center py-3 mx-auto font-semibold transition bg-blue-600 border-gray-600 rounded-md mt-7 px-9 text-gray-50 hover:bg-blue-700 active:bg-blue-800">
          View Our Products
        </a>
      </Link>
    </div>
  );
};

export default SecondSection;
