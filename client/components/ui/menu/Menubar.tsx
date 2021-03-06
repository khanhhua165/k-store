import React from "react";
import Searchbar from "../../forms/Searchbar";
import { HiChevronUp } from "react-icons/hi";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import { meatMenu, supplementMenu } from "../../../constants/routes";

const Menubar: React.FC = () => {
  const meatLinks = meatMenu.map((meatItem) => (
    <Link href={meatItem.url} key={meatItem.name}>
      <a className="hover:text-blue-700">{meatItem.name}</a>
    </Link>
  ));

  const supplementLinks = supplementMenu.map((supItem) => (
    <Link href={supItem.url} key={supItem.name}>
      <a className="hover:text-blue-700">{supItem.name}</a>
    </Link>
  ));
  return (
    <div className="flex flex-col">
      <Searchbar />
      <div className="flex flex-col justify-center w-64 mt-2">
        <Link href="/shop">
          <a className="py-2 pl-3 mb-2 bg-blue-200 rounded-lg hover:bg-blue-300">
            All Products
          </a>
        </Link>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-3 py-2 mb-2 text-left bg-blue-200 rounded-lg hover:bg-blue-300 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>Meats</span>
                <HiChevronUp
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-blue-500 transition`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="flex flex-col px-3 py-2 space-y-2">
                  {meatLinks}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-3 py-2 text-left bg-blue-200 rounded-lg hover:bg-blue-300 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>Supplements</span>
                <HiChevronUp
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-blue-500 transition`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="flex flex-col px-3 py-2 space-y-2">
                  {supplementLinks}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <Link href="/shop/organs">
          <a className="py-2 pl-3 mt-2 mb-2 bg-blue-200 rounded-lg hover:bg-blue-300">
            Organs
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Menubar;
