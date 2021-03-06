import Image from "next/image";
import React, { useState } from "react";
import { API_URL } from "../../../constants/api";
import CartContainer from "../../../containers/cart/CartContainer";
import { Product } from "../../../interfaces/Product.interface";
import ItemModal from "../../modal/ItemModal";
import classNames from "clsx";
import Rating from "./Rating";
import Link from "next/link";
import { useRouter } from "next/router";
export interface ItemProps {
  product: Product;
}

const ItemCard: React.FC<ItemProps> = ({ product }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { addProduct } = CartContainer.useContainer();
  const { numReviews, rating, image, name, _id, price } = product;

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
            src={`${API_URL}/${image}`}
            alt={name}
            width={250}
            height={250}
            objectFit="contain"
            className={`transform ${imageScale} transition duration-200 cursor-pointer`}
            onClick={() => router.push(`/product/${_id}`)}
          />

          <div className="absolute xs:flex justify-center w-[250px] top-1/2 hidden">
            <div
              className={`py-1 bg-blue-500 rounded-3xl px-9 text-gray-50 transform transition ${showTab} duration-300 hover:bg-red-500 shadow-xl cursor-pointer`}
              onClick={() => setShowModal(true)}
            >
              Quick View
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow px-3 mb-2 space-y-1">
          <Link href={`/product/${_id}`}>
            <a className="flex flex-wrap mt-2 text-lg font-bold text-blue-600 uppercase hover:text-red-500">
              {name}
            </a>
          </Link>

          <Rating
            numReviews={numReviews}
            rating={rating}
            inline={false}
            fontSize="text-base"
          />
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-blue-700 rounded-b-xl">
          <div className="text-xl font-bold text-white">${price}</div>
          <div
            className="px-1 font-bold rounded cursor-pointer bg-gray-50 hover:bg-indigo-100"
            onClick={() => addProduct(product, 1)}
          >
            Add to cart
          </div>
        </div>
      </div>
      <ItemModal
        product={product}
        showModal={showModal}
        cb={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default ItemCard;
