import React from "react";
import { ItemProps } from "../ui/ItemCard";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
interface Props extends ItemProps {
  cb: () => void;
}
const ItemModal: React.FC<Props> = ({
  cb,
  description,
  image,
  name,
  price,
  _id,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 hidden bg-gray-800 opacity-70 sm:flex"
        onClick={cb}
      ></div>
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
              src={`http://localhost:5000/${image}`}
              className="object-contain w-[350px] h-[350px]"
              alt={name}
            />
          </div>
          <div className="flex flex-col pr-5 space-y-1">
            <div className="text-2xl font-semibold">{name}</div>
            <div className="text-xl font-semibold">${price}</div>
            <div className="flex-grow text-sm line-clamp-8">{description}</div>
            <div className="flex flex-col">
              <div className="w-full h-2 mt-1 border-t border-gray-300"></div>
              <Link href={`/product/${_id}`}>
                <a className="self-end mb-4 hover:text-red-600">More Info</a>
              </Link>
              <div className="self-center px-24 py-2 text-lg font-semibold transition duration-300 border-2 border-blue-500 cursor-pointer rounded-xl hover:bg-red-500 hover:text-gray-50 hover:border-transparent">
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemModal;
