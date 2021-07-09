import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center w-full px-4 pt-48 space-y-3 text-center">
      <div className="text-5xl font-semibold font-cursive">Oh No!</div>
      <div className="text-3xl font-semibold">
        This page hasn't finished cooking
      </div>
      <div className="text-semibold">
        We can't seem to find this page. Please double-check the URL or go back
        to the homepage.
      </div>
      <Link href="/">
        <a className="px-2 py-2 text-lg font-semibold bg-blue-600 rounded hover:bg-blue-700 active:bg-blue-800 text-gray-50">
          V-Mart Home
        </a>
      </Link>
    </div>
  );
};

export default ErrorPage;
