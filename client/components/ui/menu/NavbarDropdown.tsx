import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
const NavbarMenuDropdown: React.FC = () => {
  const router = useRouter();
  return (
    <Menu as="div" className="relative inline-block text-left xs:hidden">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className="inline-flex justify-center w-full px-4 py-2 text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              title="User Control"
            >
              <GiHamburgerMenu className="text-2xl" />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            // as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      } flex rounded-md items-center w-full px-2 py-2 text-base`}
                      onClick={() => router.push("/shop")}
                    >
                      Shop
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      } flex rounded-md items-center w-full px-2 py-2 text-base`}
                      onClick={() => router.push("/mission")}
                    >
                      Our Mission
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default NavbarMenuDropdown;
