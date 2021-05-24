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
    <div className="flex flex-col px-3 pt-6 pb-3 bg-white rounded-xl">
      <Image src={image} alt={name} width={300} height={300} objectFit="fill" />
      <div className="pl-4 mb-3 text-lg text-blue-500 capitalize cursor-pointer hover:text-red-500">
        {name}
      </div>
      <div className="pl-4 text-xl font-bold">${price}</div>
    </div>
  );
};

export default ItemCard;
