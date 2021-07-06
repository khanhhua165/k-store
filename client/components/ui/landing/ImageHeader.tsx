import Link from "next/link";
import Image from "next/image";
import React from "react";

const ImageHeader = () => {
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[40rem]">
        <Image
          src="/images/butcher-page.jpg"
          alt="front page image"
          layout="fill"
          objectFit="cover"
          objectPosition="center bottom"
        />
        <div className="absolute hidden h-56 rounded-md opacity-40 w-60 xs:block top-24 left-24 bg-gray-50"></div>
        <div className="absolute left-0 right-0 w-48 mx-auto xs:mx-0 top-10 xs:top-24 xs:left-24">
          <div className="flex justify-center px-2 py-3 text-5xl font-bold text-center uppercase xs:text-left xs:justify-start">
            claim your health
          </div>
          <Link href="/shop">
            <a className="flex items-center justify-center h-10 font-semibold transition bg-blue-600 border-gray-600 rounded-md shadow-md xs:shadow-none xs:rounded-l-none xs:rounded-r-md text-gray-50 hover:bg-blue-700 active:bg-blue-800">
              Shop Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageHeader;
