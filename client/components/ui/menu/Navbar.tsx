import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import CartContainer from "../../../containers/cart/CartContainer";
import classNames from "clsx";
import CartModal from "../../modal/CartModal";
import UserSettingMenu from "../user/UserSettingMenu";

const Navbar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { totalItem } = CartContainer.useContainer();
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
  const cartNumbeOfItem = classNames({ hidden: totalItem === 0 });
  return (
    <>
      <div className="fixed top-0 left-0 z-30 w-full bg-blue-800 shadow-md text-gray-50">
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
          <div className="flex items-center justify-center space-x-3 text-lg font-semibold">
            <div
              className="relative inline-flex justify-center w-full px-4 py-2 text-white bg-black rounded-md cursor-pointer bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={() => setShowModal(true)}
              title="Shopping Cart"
            >
              <HiOutlineShoppingCart className="text-xl" />
              <div
                className={`absolute flex justify-center w-5 h-4 text-xs bg-pink-500 rounded-full -top-2 -right-2 ${cartNumbeOfItem}`}
              >
                {totalItem < 10 ? totalItem : "9+"}
              </div>
            </div>
            {/* {isLoggedIn && user && user.email === "admin@admin.com" && (
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
            )} */}
            <UserSettingMenu />
          </div>
        </div>
      </div>
      <CartModal cb={() => setShowModal(false)} showModal={showModal} />
    </>
  );
};

export default Navbar;
