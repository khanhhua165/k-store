import React from "react";
import { ItemProps } from "../ui/product/ItemCard";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Backdrop from "../ui/Backdrop";
import { Product } from "../../interfaces/Product.interface";
import { API_URL } from "../../constants/api";
import CartContainer from "../../containers/cart/CartContainer";
interface Props extends ItemProps {
  cb: () => void;
}
const ItemModal: React.FC<Props> = ({ cb, product }) => {
  const { _id, description, image, name, price, size } = product;
  const { addProduct } = CartContainer.useContainer();
  return (
    <>
      <Backdrop cb={cb} />
      <div className="fixed top-1/2 left-1/2 mt-[-250px] ml-[-350px] z-50 sm:flex flex flex-col w-[700px] h-[500px] bg-gray-50 rounded-xl pr-2">
        <div className="flex justify-end mt-2 mb-1">
          <IoClose
            className="text-4xl text-gray-500 cursor-pointer hover:text-gray-900"
            onClick={cb}
          />
        </div>
        <div className="flex space-x-2">
          <div className="flex-shrink-0 w-[350px]">
            <img
              src={`${API_URL}/${image}`}
              className="object-contain w-[350px] h-[350px]"
              alt={name}
            />
          </div>
          <div className="flex flex-col pr-5 space-y-1">
            <div className="text-2xl font-semibold">{name}</div>
            <div className="flex space-x-3">
              <div className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg">
                ${price}
              </div>
              <div className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg">
                {size}
              </div>
            </div>
            <div className="flex-grow text-sm line-clamp-8">{description}</div>
            <div className="flex flex-col">
              <div className="w-full h-2 mt-1 border-t border-gray-300"></div>

              <div className="flex justify-center mt-3 space-x-3">
                <div
                  className="self-center px-6 py-2 font-semibold transition duration-300 border-2 border-blue-500 cursor-pointer rounded-xl hover:bg-red-500 hover:text-gray-50 hover:border-transparent"
                  onClick={() => addProduct(product, 1)}
                >
                  Add to Cart
                </div>
                <Link href={`/product/${_id}`}>
                  <a
                    className="self-center px-6 py-2 font-semibold text-white transition duration-300 bg-green-500 border-2 border-green-500 cursor-pointer rounded-xl hover:bg-red-500 hover:text-gray-50 hover:border-transparent"
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
    </>
  );
};
export default ItemModal;
