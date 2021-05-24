import Image from "next/image";
import React from "react";

interface Props {
  _id: string;
  image: string;
  name: string;
  price: number;
  description: string;
}

const ItemCard: React.FC<Props> = ({
  _id,
  image,
  name,
  price,
  description,
}) => {
  return (
    <div className="flex flex-col pt-4 bg-white rounded-xl w-[250px] shadow-lg justify-between">
      <div className="flex flex-wrap px-3 mb-1 text-xl font-bold text-blue-600 uppercase cursor-pointer cap hover:text-red-500 overflow-clip">
        {name}
      </div>
      <div className="px-3 mb-2 text-sm line-clamp-3">{description}</div>
      <Image
        src={`http://localhost:5000/${image}`}
        alt={name}
        width={250}
        height={250}
        objectFit="contain"
      />
      <div className="flex items-center justify-between px-3 py-2 bg-blue-700 rounded-b-xl">
        <div className="text-xl font-bold text-white">${price}</div>
        <div className="px-1 font-bold rounded cursor-pointer bg-gray-50 hover:bg-indigo-100">
          Add to cart
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
