import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import CartContainer from "../../containers/cart/CartContainer";
import { IoIosArrowDropleft } from "react-icons/io";
import CartItem from "../ui/cart/CartItem";
import { BsFillTrashFill } from "react-icons/bs";
import { useRouter } from "next/router";
interface Props {
  showModal: boolean;
  cb: () => void;
}

const CartModal: React.FC<Props> = ({ cb, showModal }) => {
  const { cartItem, totalItem, totalPrice } = CartContainer.useContainer();
  const router = useRouter();
  const itemsDisplayed = cartItem.map((item) => (
    <CartItem productInCart={item} key={item.product._id} cb={cb} />
  ));
  const handleCheckoutClick = () => {
    if (router.pathname !== "/checkout") {
      router.push("/checkout");
    }
    cb();
  };
  return (
    <Transition show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-scroll"
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
            <div className="inline-block w-full max-w-[40rem] px-6 py-4 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
              <div className="flex justify-end">
                <IoClose
                  className="text-4xl text-gray-500 cursor-pointer hover:text-gray-900"
                  onClick={cb}
                />
              </div>
              <Dialog.Title className="text-xl font-semibold">
                Shopping Cart
              </Dialog.Title>
              <div className="flex flex-col py-3 my-3 border-t border-b">
                <div className="flex items-center pb-3 text-gray-500">
                  <span className="flex justify-center w-24">Photo</span>
                  <span className="flex justify-center w-48 mx-3">Name</span>
                  <span className="flex justify-center mx-2 w-28">Price</span>
                  <span className="flex justify-center mx-2 w-36">
                    Quantity
                  </span>
                  <span className="flex justify-center mx-2 w-28">Total</span>
                  <span className="opacity-0">
                    <BsFillTrashFill />
                  </span>
                </div>
                {itemsDisplayed}
              </div>
              <div className="flex justify-between w-full mb-4 text-lg">
                <div className="flex space-x-1 font-semibold">
                  <span>Total Item:</span>
                  <span>{totalItem}</span>
                </div>
                <div className="flex space-x-3 font-semibold">
                  <span>Subtotal: </span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center px-2 py-2 space-x-1 font-semibold text-white transition bg-blue-500 rounded-md cursor-pointer hover:bg-red-500 active:bg-red-600"
                  onClick={cb}
                >
                  <span className="text-2xl">
                    <IoIosArrowDropleft />
                  </span>
                  <span>Continue Shopping</span>
                </div>
                <button
                  className="px-2 py-2 font-semibold transition border border-blue-500 rounded-md hover:bg-red-500 active:bg-red-600 hover:text-white hover:border-transparent"
                  onClick={handleCheckoutClick}
                >
                  Checkout
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartModal;
