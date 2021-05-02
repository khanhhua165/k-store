import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const navItems = [
    { path: "/shop", name: "Shop" },
    { path: "/blog", name: "Blog" },
    { path: "/about", name: "About us" },
  ];
  const NavItems = navItems.map((navItem) => (
    <Link href={navItem.path} key={navItem.name}>
      <a className="text-xl font-semibold transition border-b-2 border-transparent hover:border-gray-50">
        {navItem.name}
      </a>
    </Link>
  ));
  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-blue-800 shadow-md text-gray-50">
      <div className="flex items-center justify-between px-4 py-4 mx-auto sm:px-14 max-w-[100rem]">
        <div className="flex space-x-5 justify-left">
          <Link href="/">
            <a className="text-2xl font-bold tracking-widest uppercase font-cursive">
              K-Store
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-7">
          {NavItems}
        </div>
        <div className="flex justify-center space-x-4 text-lg font-semibold">
          <Link href="/signup">
            <a>SignUp</a>
          </Link>
          <Link href="/signin">
            <a>SignIn</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
