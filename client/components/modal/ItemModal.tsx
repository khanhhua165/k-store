import React, { Fragment } from "react";
import { ItemProps } from "../ui/product/ItemCard";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { API_URL } from "../../constants/api";
import CartContainer from "../../containers/cart/CartContainer";
import Rating from "../ui/product/Rating";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
interface Props extends ItemProps {
  showModal: boolean;
  cb: () => void;
}
const ItemModal: React.FC<Props> = ({ cb, product, showModal }) => {
  const { addProduct } = CartContainer.useContainer();
  const { _id, description, image, name, price, size, rating, numReviews } =
    product;
  return (
    <Transition show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        open={showModal}
        onClose={cb}
      >
        <div className="px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-[40rem] p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
              <div className="flex justify-end">
                <IoClose
                  className="text-4xl text-gray-500 cursor-pointer hover:text-gray-900"
                  onClick={cb}
                />
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <Image
                    objectFit="contain"
                    width="330"
                    height="330"
                    src={`${API_URL}/${image}`}
                    alt={name}
                  />
                </div>
                <div className="flex flex-col w-1/2 pr-5 space-y-2">
                  <Dialog.Title className="text-2xl font-semibold">
                    {name}
                  </Dialog.Title>
                  <Rating
                    rating={rating}
                    numReviews={numReviews}
                    inline={true}
                    fontSize="text-lg"
                  />
                  <div className="flex space-x-3">
                    <div className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg">
                      ${price}
                    </div>
                    <div className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg">
                      {size}
                    </div>
                  </div>
                  <Dialog.Description className="flex-grow text-sm line-clamp-8">
                    {description}
                  </Dialog.Description>
                  <div className="flex flex-col">
                    <div className="w-full h-2 mt-1 border-t border-gray-300"></div>

                    <div className="flex justify-center mt-3 space-x-3">
                      <div
                        className="self-center px-2 py-2 font-semibold transition duration-300 border-2 border-blue-500 cursor-pointer rounded-xl hover:bg-red-500 hover:text-gray-50 hover:border-transparent"
                        onClick={() => addProduct(product, 1)}
                      >
                        Add to Cart
                      </div>
                      <Link href={`/product/${_id}`}>
                        <a
                          className="self-center px-2 py-2 font-semibold text-white transition duration-300 bg-green-500 border-2 border-green-500 cursor-pointer rounded-xl hover:bg-red-500 hover:text-gray-50 hover:border-transparent"
                          onClick={() => addProduct(product, 1)}
                        >
                          More Info
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
export default ItemModal;
