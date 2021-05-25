import React from "react";
import Link from "next/link";
import UserContainer from "../../containers/user/UserContainer";
import useCartAuthenticated from "../../hooks/useCartAuthenticated";
import { HiOutlineShoppingCart } from "react-icons/hi";
const classNames = require("classnames");

const Navbar: React.FC = () => {
  const { isLoggedIn, user, logout } = UserContainer.useContainer();
  const { totalItem } = useCartAuthenticated();
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
  console.log(totalItem);
  const cartNumbeOfItem = classNames({ hidden: totalItem === 0 });
  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-blue-800 shadow-md text-gray-50">
      <div className="flex items-center justify-between px-4 py-4 mx-auto sm:px-14 max-w-[100rem]">
        <div className="flex space-x-5 justify-left">
          <Link href="/">
            <a className="text-2xl font-bold tracking-widest uppercase font-cursive">
              V-Store
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-7">
          {NavItems}
        </div>
        <div className="flex items-center justify-center space-x-5 text-lg font-semibold">
          <div className="relative">
            <HiOutlineShoppingCart className="text-xl cursor-pointer" />
            <div
              className={`absolute flex justify-center w-5 h-4 text-xs bg-pink-400 rounded-full -top-2 -right-2 ${cartNumbeOfItem}`}
            >
              {totalItem}
            </div>
          </div>
          {isLoggedIn && user && user.email === "admin@admin.com" && (
            <Link href="/admin">
              <a>Admin</a>
            </Link>
          )}
          {isLoggedIn && user && (
            <>
              <Link href={`/user/${user!._id}`}>
                <a>{user.name}</a>
              </Link>
              <div className="cursor-pointer" onClick={logout}>
                SignOut
              </div>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link href="/signup">
                <a>SignUp</a>
              </Link>
              <Link href="/signin">
                <a>SignIn</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
