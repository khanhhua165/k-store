import { Disclosure, Transition } from "@headlessui/react";
import React from "react";
import { HiChevronUp } from "react-icons/hi";
import RecipientInfo from "./RecipientInfo";

interface Props {
  cb: (showInfo: boolean) => void;
}

const RecipientInfoDisclosure: React.FC<Props> = ({ cb }) => {
  return (
    <div className="w-full max-w-md mt-3 xs:hidden">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full px-3 py-2 text-left bg-blue-200 rounded-lg hover:bg-blue-300 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span className="">Recipient Info</span>
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
                <div
                  className="self-end px-2 py-1 text-white bg-blue-700 rounded-lg cursor-pointer"
                  onClick={() => cb(true)}
                >
                  Edit Info
                </div>
                <RecipientInfo />
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default RecipientInfoDisclosure;
