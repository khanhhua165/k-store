import Image from "next/image";
import React, { useState } from "react";
import ItemModal from "../modal/ItemModal";
const classNames = require("classnames");
export interface ItemProps {
  _id: string;
  image: string;
  name: string;
  price: number;
  description: string;
}

const ItemCard: React.FC<ItemProps> = ({
  _id,
  image,
  name,
  price,
  description,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const imageScale = classNames({ "scale-125": showPreview });
  const showTab = classNames(
    { "scale-100": showPreview },
    { "scale-0": !showPreview },
    { "translate-y-0": showPreview },
    { "-translate-y-36": !showPreview }
  );
  return (
    <>
      <div
        className="flex flex-col pt-4 bg-white rounded-xl w-[250px] shadow-lg"
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
      >
        <div className="w-[250px] h-[250px] relative">
          <Image
            src={`http://localhost:5000/${image}`}
            alt={name}
            width={250}
            height={250}
            objectFit="contain"
            className={`transform ${imageScale} transition duration-200`}
          />
          <div className="absolute flex justify-center w-[250px] top-1/2">
            <div
              className={`py-1 bg-blue-500 rounded-3xl px-9 text-gray-50 transform transition ${showTab} duration-300 hover:bg-red-500 shadow-xl cursor-pointer`}
              onClick={() => setShowModal(true)}
            >
              Quick View
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow px-3 mb-2 space-y-2">
          <div className="flex flex-wrap text-xl font-bold text-blue-600 uppercase cursor-pointer cap hover:text-red-500 overflow-clip">
            {name}
          </div>
          <div className="text-sm line-clamp-3">{description}</div>
        </div>

        <div className="flex items-center self-stretch justify-between px-3 py-2 bg-blue-700 rounded-b-xl">
          <div className="text-xl font-bold text-white">${price}</div>
          <div className="px-1 font-bold rounded cursor-pointer bg-gray-50 hover:bg-indigo-100">
            Add to cart
          </div>
        </div>
      </div>
      {showModal ? (
        <ItemModal
          _id={_id}
          cb={() => {
            setShowModal(false);
          }}
          description={description}
          image={image}
          name={name}
          price={price}
        />
      ) : null}
    </>
  );
};

export default ItemCard;
