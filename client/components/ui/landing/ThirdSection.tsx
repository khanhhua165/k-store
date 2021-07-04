import Link from "next/link";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
const ThirdSection = () => {
  return (
    <div className="flex flex-col pt-10 mb-10">
      <div className="flex items-center justify-center text-3xl font-bold text-center text-blue-700 uppercase xs:text-4xl">
        How It Works
      </div>
      <div className="flex items-center justify-center mt-3 font-semibold text-center xs:text-lg mb-">
        We make it easy to feed your family the best.
      </div>

      <div className="mt-7 relative w-11/12 lg:w-[1105px] mx-auto justify-end flex flex-col sm:flex-row border shadow-md rounded-md sm:border-0 sm:shadow-none sm:rounded-none">
        <div className="w-full sm:w-7/12">
          <img
            src="/images/how-it-works-1.jpg"
            alt="We source"
            className="sm:h-[435px] object-cover object-center sm:rounded-lg rounded-t-lg"
          />
        </div>
        <div className="flex-col w-full px-6 py-5 space-y-4 bg-gray-100 sm:absolute sm:left-0 sm:w-6/12 sm:my-auto sm:transform sm:-translate-y-1/2 sm:border sm:border-gray-200 sm:shadow-md sm:top-1/2">
          <div className="text-3xl font-bold">
            <span className="text-blue-700">1</span> We source
          </div>
          <div className="text-lg font-semibold">
            We source our meat and seafood from partners with the highest
            standards for quality.
          </div>
          <Link href="/mission">
            <a className="flex items-center space-x-1 text-lg font-semibold text-blue-700 hover:underline">
              <span>Learn about our sourcing</span>
              <HiOutlineArrowNarrowRight />
            </a>
          </Link>
        </div>
      </div>

      <div className="mt-11 relative w-11/12 md:max-w-[1105px] mx-auto justify-start flex flex-col sm:flex-row border shadow-md rounded-md sm:border-0 sm:shadow-none sm:rounded-none">
        <div className="w-full sm:w-7/12">
          <img
            src="/images/how-it-works-2.jpg"
            alt="You choose"
            className="sm:h-[435px] object-cover object-center sm:rounded-lg rounded-t-lg"
          />
        </div>
        <div className="flex-col w-full px-6 py-5 space-y-4 bg-gray-100 sm:absolute sm:right-0 sm:w-6/12 sm:my-auto sm:transform sm:-translate-y-1/2 sm:border sm:border-gray-200 sm:shadow-md sm:top-1/2">
          <div className="text-3xl font-bold">
            <span className="text-blue-700">2</span> You choose
          </div>
          <div className="text-lg font-semibold">
            Choose from a wide variety of product in our store. Select a
            delivery time that suits you.
          </div>
          <Link href="/shop">
            <a className="flex items-center space-x-1 text-lg font-semibold text-blue-700 hover:underline">
              <span>View our shop</span>
              <HiOutlineArrowNarrowRight />
            </a>
          </Link>
        </div>
      </div>

      <div className="mt-7 relative w-11/12 lg:w-[1105px] mx-auto justify-end flex flex-col sm:flex-row border shadow-md rounded-md sm:border-0 sm:shadow-none sm:rounded-none">
        <div className="w-full sm:w-7/12">
          <img
            src="/images/how-it-works-3.jpg"
            alt="We delivery"
            className="sm:h-[435px] object-cover object-center sm:rounded-lg rounded-t-lg"
          />
        </div>
        <div className="flex-col w-full px-6 py-5 space-y-4 bg-gray-100 sm:absolute sm:left-0 sm:w-6/12 sm:my-auto sm:transform sm:-translate-y-1/2 sm:border sm:border-gray-200 sm:shadow-md sm:top-1/2">
          <div className="text-3xl font-bold">
            <span className="text-blue-700">3</span> We deliver
          </div>
          <div className="text-lg font-semibold">
            Your order ships for free, frozen for freshness and packed in an
            eco-friendly box.
          </div>
          <Link href="/mission">
            <a className="flex items-center space-x-1 text-lg font-semibold text-blue-700 hover:underline">
              <span>See more about our products</span>
              <HiOutlineArrowNarrowRight />
            </a>
          </Link>
        </div>
      </div>

      <div className="mt-11 relative w-11/12 md:max-w-[1105px] mx-auto justify-start flex flex-col sm:flex-row border shadow-md rounded-md sm:border-0 sm:shadow-none sm:rounded-none">
        <div className="w-full sm:w-7/12">
          <img
            src="/images/how-it-works-4.jpg"
            alt="You enjoy"
            className="sm:h-[435px] object-cover object-center sm:rounded-lg rounded-t-lg"
          />
        </div>
        <div className="flex-col w-full px-6 py-5 space-y-4 bg-gray-100 sm:absolute sm:right-0 sm:w-6/12 sm:my-auto sm:transform sm:-translate-y-1/2 sm:border sm:border-gray-200 sm:shadow-md sm:top-1/2">
          <div className="text-3xl font-bold">
            <span className="text-blue-700">4</span> You enjoy!
          </div>
          <div className="text-lg font-semibold">
            High-quality meat delivered to your door means more time for amazing
            meals together.
          </div>
          <Link href="/shop">
            <a className="flex items-center space-x-1 text-lg font-semibold text-blue-700 hover:underline">
              <span>Choose your favorite products</span>
              <HiOutlineArrowNarrowRight />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
